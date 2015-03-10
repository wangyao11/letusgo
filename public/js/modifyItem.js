'use strict';
require.config({
  baseUrl: '../',
  paths: {
    'jquery': './jquery/dist/jquery',
    'semantic': './semantic-ui/dist/semantic',
  }
});

require(['semantic', 'jquery'], function (semantic, $) {

  $(document).ready(function () {

    $('#emptyError').hide();
    $('#priceError').hide();

    $('.save').on('click', verifyInfo);

    function verifyInfo() {
      var id = this.id;
      var name = $('input#itemName').val();
      var unit = $('input#itemUnit').val();
      var price = $('input#itemPrice').val();

      var isIntergrated = name && unit && price;

      if (!isIntergrated) {
        $('#emptyError').show();
      } else {
        $('#emptyError').hide();
        priceIsNumber(id, name, unit, price);
      }
    }

    function priceIsNumber(id, name, unit, price) {

      var reg = /^\d+(\.\d+)?$/;

      var priceIsNumber = reg.exec(price);

      if (!priceIsNumber) {

        $('#priceError').show();
      } else {

        $('#priceError').hide();
        updateItem(id, name, unit, price);
      }
    }

    function updateItem(id, name, unit, price) {
      $.post('/api/item/'+id, {_id: id, name: name, unit: unit, price: price})
        .success(function () {
          $(location).attr('href', '/shopManagement')
        });
    }

  });
});
