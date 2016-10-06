(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope'];

  AWS.config.update({
    region: 'ap-northeast-1',
    endpoint: 'https://dynamodb.ap-northeast-1.amazonaws.com',
    accessKeyId: 'AKIAJ27JLSFIFYD62MCA', secretAccessKey: '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'
  });
  var YData = new Array();
  var XData = new Array();
  var docClient = new AWS.DynamoDB.DocumentClient();
  var eui = 'BE7A0000000000D9';
  var params = {
    TableName: 'Lora',
    KeyConditionExpression: '#eui = :name',
    ExpressionAttributeNames: {
      '#eui': 'EUI'
    },
    ExpressionAttributeValues: {
      ':name': 'BE7A0000000000D9'
    }
  };
  function HomeController($scope) {
    var vm = this;
    $scope.config = {
      title: 'TDS',
      tooltips: false,
      labels: false,
      mouseover: function() {},
      mouseout: function() {},
      click: function() {},
      legend: {
        display: true,
        // could be 'left, right'
        position: 'right'
      }
    };
    docClient.query(params, function(err, data) {
      if (err) {
        console.error('Unable to read item. Error JSON:', JSON.stringify(err, null, 2));
      } else {
        data.Items.forEach(function(item) {
          $scope.chdata.data.push(
            {
              x: item.timestamp,
              y: [parseInt(item.payload.state.reported.data, 3)]
            });
            $scope.tdsData = item.payload.state.reported.data, 3;
            $scope.timeStamp = item.timestamp;
          console.log(' -', item.timestamp + ': ' + item.payload.state.reported.data);
        });
      }
    });
    $scope.chdata = {
      series: ['TDS'],
      data: [{
        x: 0,
        y: 0,
        tooltip: 'this is tooltip'
      }]
    };
    $scope.click = function(event) {
      console.log($scope.chdata);
    };

    $scope.showInfoWindow = function (event) {
      var infowindow = new google.maps.InfoWindow();
      infowindow.open('bar', this);
    };
  }
}());
