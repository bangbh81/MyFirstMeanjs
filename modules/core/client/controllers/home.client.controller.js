(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope'];
  function HomeController($scope) {
    var vm = this;
    $scope.click = function(event) {
      docClient.get(params, function(err, data) {
        if (err) {
          console.error('Unable to read item. Error JSON:', JSON.stringify(err, null, 2));
        } else {
          console.log('GetItem succeeded:', JSON.stringify(data, null, 2));
        }
      });
    };
  }
  AWS.config.update({
    region: 'ap-northeast-1',
    endpoint: 'https://dynamodb.ap-northeast-1.amazonaws.com',
    accessKeyId: 'AKIAJSZLRE4VWDTM7QQA', secretAccessKey: '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'
  });
  var docClient = new AWS.DynamoDB.DocumentClient();
  var table = 'MQTT-RAW';
  var mqtt_raw = '1';
  var params = {
    TableName: table,
    Key: {
      'mqtt-raw': mqtt_raw
    }
  };
}());
