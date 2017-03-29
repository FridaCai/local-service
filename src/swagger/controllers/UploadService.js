'use strict';
var logger = require('../../logger.js').logger('normal');

var fs = require('fs');
var request = require('request');
var path = require('path');
var AdmZip = require('adm-zip');

exports.upload = function(args, res, next){
	//var uuid = args.uuid.value;
	var uuid = '3f36523011ef11e7945445934c3cf2a9';
	
	var log = fs.createReadStream(`logs/all_${uuid}.log`);

	var zip = new AdmZip();
	zip.addLocalFolder(`codebase/rfq-web.git_${uuid}/coverage`);
	zip.writeZip("test/files.zip");
	

	var report = zip.toBuffer();

	var formData = {
		uuid: uuid,
		report: report,
		log: log
	}

	var url = 'http://localhost:8003/v1/upload';
	var req = request.post({
		url: url,
		formData: formData	
	}, function (err, resp, body) {
	  if (err) {
	    console.log('Error!');
	  } else {
	    console.log('URL: ' + body);
	  }
	});
}