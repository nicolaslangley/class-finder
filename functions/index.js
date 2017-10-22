const functions = require('firebase-functions');

var cheerio = require('cheerio');
var rp = require('request-promise');
var jsonfile = require('jsonfile')
const cors = require('cors')({ origin: true });

var gcloud = require('google-cloud');
// Enable Storage
var gcs = gcloud.storage({
  projectId: 'class-finder-541'
});
// Reference an existing bucket.
var bucket = gcs.bucket('class-finder-541da.appspot.com');

function scrape_pnca(body) {
  var $ = cheerio.load(body);
  var classList = [];
  var classes = $(".classdesc h3").each(function (i, elem) {
    classList[i] = {
      name: $(this).text().trim(),
      school: "Pacific Northwest College of Art (PNCA)"
    };
  });
  return classList;
}

// This scraping function has been deprecated 
// var mhcc_url = 'http://learn.mhcc.edu/modules/shop/searchOfferings.action';
function scrape_mhcc(body) {
  var $ = cheerio.load(body, {
    xmlMode: true
  });
  var classList = [];
  var classes = $("Name").each(function (i, elem) {
    classList[i] = {
      name: $(this).text().trim(),
      link: "temp",
      school: "Mt. Hood Community College (MHCC)"
    };
  });
  return classList;
}

function scrape_pcc(body) {
  var $ = cheerio.load(body);
  var classList = [];
  var classes = $(".course-list > dd > a").each(function (i, elem) {
    classList[i] = {
      name: $(this).text().trim(),
      school: "Portland Community College (PCC)"
    };
  });
  return classList;
}

function scrape_ocac(body) {
  var $ = cheerio.load(body);
  var classList = [];
  var classes = $(".course-teaser > .node-title").each(function (i, elem) {
    classList[i] = {
      name: $(this).text().trim(),
      school: "Oregon College of Art and Craft (OCAC)"
    };
  });
  return classList;
}

function scrape_osu(body) {
  var $ = cheerio.load(body);
  var classList = [];
  var classes = $(".field-content").each(function (i, elem) {
    classList[i] = {
      name: $(this).text().trim(),
      school: "Oregon State University (OSU)"
    };
  });
  return classList;
}

exports.findClasses = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    var totalList = [];
    // Chain all requests to create a list of all results
    var pnca_url = 'https://cereg.pnca.edu/p/adult';
    rp(pnca_url) // PNCA request
      .then(function (body) {
        console.log("\n===============\n" + "Pulling from PNCA: " + pnca_url + "\n===============\n");
        totalList = scrape_pnca(body);
      }).then(function () {
        var pcc_url = 'https://www.pcc.edu/schedule/default.cfm?fa=dspTopicDetails&thisTerm=201704&topicid=CAR&type=Non-Credit';
        rp(pcc_url) // PCC request
          .then(function (body) {
            console.log("\n===============\n" + "Pulling from PCC: " + pcc_url + "\n===============\n");
            totalList = totalList.concat(scrape_pcc(body));
          }).then(function () {
            var ocac_url = 'https://community.ocac.edu/courses?field_organization_tag_tid=415&type=All&field_instructor_target_id=All&title=';
            rp(ocac_url) // OCAC request
              .then(function (body) {
                console.log("\n===============\n" + "Pulling from OCAC: " + ocac_url + "\n===============\n");
                totalList = totalList.concat(scrape_ocac(body));
              }).then(function () {
                var osu_url = 'https://pace.oregonstate.edu/catalog';
                rp(osu_url) // OSU request
                  .then(function (body) {
                    console.log("\n===============\n" + "Pulling from OSU: " + osu_url + "\n===============\n");
                    totalList = totalList.concat(scrape_osu(body));
                    // Write out list to JSON
                    var filePath = '/tmp/classlist.json'
                    jsonfile.writeFile(filePath, totalList, function (err) {
                      console.error(err)
                    });
                    // Upload a local file to a new file to be created in your bucket.
                    bucket.upload(filePath, function (err, file) {
                      if (!err) {
                        console.log("Upload successful");
                      }
                    });
                    res.status(200).send(totalList);
                  }).catch(function (err) {
                    console.log("We’ve encountered an error: " + err);
                  });
              });
          });
      });
  });
});
});
