// TODO: Replace with the URL of your WebService app
var serviceUrl = 'http://localhost:59184/api/Products';

function sendRequest() {
    var method = $('#method').val();
    var product = $('#product').val();
    $.ajax({
        type: method,
        url: serviceUrl
    }).done(function (data) {
        data.forEach(function (val) {
            callback(val)
        });
    }).error(function (jqXHR, textStatus, errorThrown) {
        $('#value1').text(jqXHR.responseText || textStatus);
    });
}

function callback(val) {
    //  $("#products").replaceWith("<span id='value1'>(Result)</span>");
    $("#value1").replaceWith("<ul id='products' />");
    var str = "ProductID: " + val.productID + " Name: " + val.name + " mfg: " + val.mfg + " Vendor: " + val.vendor + " Price: " + val.price;
    $('<li/>', { text: str }).appendTo($('#products'));
}

function find() {
    var id = $('#productIdFind').val();
    $.getJSON(serviceUrl + "/" + id,
        function (data) {
            if (data == null) {
                $('#productFind').text('Product not found.');
            }
            var str = data.productID + ': ' + data.name + ':' + data.mfg + ':' + data.vendor + ':' + data.price + ':';
            $('#productFind').text(str);
        })
    .fail(
        function (jqueryHeaderRequest, textStatus, err) {
            $('#productFind').text('Find error: ' + err);
        });
}

// Add a new product.
function create() {
    jQuery.support.cors = true;
    var product = {
        productID: $('#txtAdd_productID').val(),
        name: $('#txtAdd_name').val(),
        mfg: $('#txtAdd_mfg').val(),
        vendor: $('#txtAdd_vendor').val(),
        price: $('#txtAdd_price').val()
    };
    var id = $('#productIdFind').val();

    var cr = JSON.stringify(product);
    $.ajax({
        url: serviceUrl,
        type: 'POST',
        data: JSON.stringify(product),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            $('#productCreate')
                .text('Product successfully created.');
            updateList();
        },
        error: function (_httpRequest, _status, _httpError) {
            // XMLHttpRequest, textStatus, errorThrow
            $('#productCreate')
            .text('Error while adding product.  XMLHttpRequest:'
                    + _httpRequest + '  Status: ' + _status
                    + '  Http Error: ' + _httpError);
        }
    });
}

// Update a product object.
function update() {
    jQuery.support.cors = true;
    var product = {
        productID: $('#txtUpdate_productID').val(),
        name: $('#txtUpdate_name').val(),
        mfg: $('#txtUpdate_mfg').val(),
        vendor: $('#txtUpdate_vendor').val(),
        price: $('#txtUpdate_price').val()
    };

    var cr = JSON.stringify(product);
    $.ajax({

        url: serviceUrl + "/" + $('#txtUpdate_productID').val(),
        type: 'PUT',
        data: JSON.stringify(product),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            $('#productUpdate')
            .text('The update was successful.');
            updateList();
        },
        error: function (_httpRequest, _status, _httpError) {
            $('#productUpdate')
            .text('Error while adding product.  XMLHttpRequest:'
            + _httpRequest + '  Status: ' + _status + '  Http Error: '
            + _httpError);
        }
    });
}

function del() {
    var id = $('#productID').val();
    $.ajax({
        url: serviceUrl + "/" +id,
        type: 'DELETE',
        dataType: 'json',

        success: function (data) {
            $('#productDelete').text('Delete successful.');
            updateList();
        }
    }).fail(
        function (jqueryHeaderRequest, textStatus, err) {
            $('#productDelete').text('Delete error: ' + err);
        });
}
