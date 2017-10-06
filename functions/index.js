const functions = require('firebase-functions');

var cheerio = require('cheerio');
var rp = require('request-promise')
const cors = require('cors')({ origin: true });

function scrape_pnca(body) {
  var $ = cheerio.load(body);
  var classList = [];
  var classes = $(".classdesc h3").each(function (i, elem) {
    classList[i] = $(this).text().trim();
  });
  return classList;
}

function scrape_mhcc(body) {
  var $ = cheerio.load(body, {
    xmlMode: true
  });
  var classList = [];
  var classes = $("Name").each(function (i, elem) {
    classList[i] = $(this).text().trim();
  });
  return classList;
}

function scrape_pcc(body) {
  var $ = cheerio.load(body);
  var classList = [];  
  var classes = $(".course-list > dd > a").each(function(i, elem){
    classList[i] = $(this).text().trim();
  });
  return classList;
}

function scrape_ocac(body) {
  var $ = cheerio.load(body);
  var classList = [];  
  var classes = $(".course-teaser > .node-title").each(function(i, elem){
    classList[i] = $(this).text().trim();
  });
  return classList;
}

function scrape_osu(body) {
  var $ = cheerio.load(body);
  var classList = [];  
  var classes = $(".field-content").each(function(i, elem){
    classList[i] = $(this).text().trim();
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
        var mhcc_url = 'http://learn.mhcc.edu/modules/shop/searchOfferings.action';
        rp(mhcc_url) // MHCC request
          .then(function (body) {
            console.log("\n===============\n" + "Pulling from MHCC: " + mhcc_url + "\n===============\n");
            totalList = totalList.concat(scrape_mhcc(body));
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
