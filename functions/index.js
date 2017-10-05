const functions = require('firebase-functions');

var cheerio = require('cheerio');
var rp = require('request-promise')
var cors = require('cors');
const express = require('express')();

express.use(cors({ origin : true }));
express.get("*", (req, res) => {
  var totalList = [];
  var urlCount = 2;
  var count = 0;
  var pnca_url = 'https://cereg.pnca.edu/p/adult';
  rp(pnca_url)
    .then(function (body) {
      console.log("\n===============\n" + "Pulling from PNCA: " + pnca_url + "\n===============\n");
      var $ = cheerio.load(body);
      var classList = [];  
      var classes = $(".classdesc h3").each(function(i, elem){
        classList[i] = $(this).text().trim();
      });
      console.log(classList.join('\n'));
      totalList = classList;
    }).then(function() {
      var mhcc_url = 'http://learn.mhcc.edu/modules/shop/searchOfferings.action';
      rp(mhcc_url)
        .then(function (body) {
          console.log("\n===============\n" + "Pulling from MHCC: " + mhcc_url + "\n===============\n");
          var $ = cheerio.load(body,{
            xmlMode: true
          });
          var classList = [];  
          var classes = $("Name").each(function(i, elem){
            classList[i] = $(this).text().trim();
          });
          console.log(classList.join('\n'));
          totalList += classList;
          res.send(totalList);
        }).catch(function(err) {
          console.log("We’ve encountered an error: " + err);
        });
    }).catch(function(err) {
      console.log("We’ve encountered an error: " + err);
    });
});

exports.findClasses = functions.https.onRequest(express);

/*
exports.findClasses = functions.https.onRequest((req, res) => {
  var pnca_url = 'https:https://cereg.pnca.edu/p/adult';
  request(pnca_url, function (error, response, body) {
    if (!error) {
      console.log("\n===============\n" + "Pulling from PNCA: " + pnca_url + "\n===============\n");
      var $ = cheerio.load(body);
      var classList = [];  
      var classes = $(".classdesc h3").each(function(i, elem){
        classList[i] = $(this).text().trim();
      });
      console.log(classList.join('\n'));
    } else {
      console.log("We’ve encountered an error: " + error);
    }
  });

  var mhcc_url = 'http://learn.mhcc.edu/modules/shop/searchOfferings.action';
  request(mhcc_url, function (error, response, body) {
    if (!error) {
      console.log("\n===============\n" + "Pulling from MHCC: " + mhcc_url + "\n===============\n");
      var $ = cheerio.load(body,{
        xmlMode: true
      });
      var classList = [];  
      var classes = $("Name").each(function(i, elem){
        classList[i] = $(this).text().trim();
      });
      console.log(classList.join('\n'));
    } else {
      console.log("We’ve encountered an error: " + error);
    }
  });

  var pcc_url = 'https://www.pcc.edu/schedule/default.cfm?fa=dspTopicDetails&thisTerm=201704&topicid=CAR&type=Non-Credit';
  request(pcc_url, function (error, response, body) {
    if (!error) {
      console.log("\n===============\n" + "Pulling from PCC: " + pcc_url + "\n===============\n");
      var $ = cheerio.load(body);
      var classList = [];  
      var classes = $(".course-list > dd > a").each(function(i, elem){
        classList[i] = $(this).text().trim();
      });
      console.log(classList.join('\n'));

    } else {
      console.log("We’ve encountered an error: " + error);
    }
  });

  var ocac_url = 'https://community.ocac.edu/courses?field_organization_tag_tid=415&type=All&field_instructor_target_id=All&title=';
  request(ocac_url, function (error, response, body) {
    if (!error) {
      console.log("\n===============\n" + "Pulling from OCAC: " + ocac_url + "\n===============\n");
      var $ = cheerio.load(body);
      var classList = [];  
      var classes = $(".course-teaser > .node-title").each(function(i, elem){
        classList[i] = $(this).text().trim();
      });
      console.log(classList.join('\n'));

    } else {
      console.log("We’ve encountered an error: " + error);
    }
  });

  var osu_url = 'https://pace.oregonstate.edu/catalog';
  request(osu_url, function (error, response, body) {
    if (!error) {
      console.log("\n===============\n" + "Pulling from OSU: " + osu_url + "\n===============\n");
      var $ = cheerio.load(body);
      var classList = [];  
      var classes = $(".field-content").each(function(i, elem){
        classList[i] = $(this).text().trim();
      });
      console.log(classList.join('\n'));

    } else {
      console.log("We’ve encountered an error: " + error);
    }
    });
});
*/
