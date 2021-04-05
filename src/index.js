import '@laylazi/bootstrap-rtl-scss/scss/bootstrap-rtl.scss';
import './sass/styles.scss';
import 'bootstrap';
import 'jquery/dist/jquery.slim';
import 'popper.js/dist/popper';
import '@fortawesome/fontawesome-free/js/all'
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('.add-to-cart-btn').on("click", function () {
        alert("تم إضافة المنتج الى العربة بنجاح!");
    });
    $("#copyright").text(" جميع الحقوق محفوظة للمتجر لسنة " + new Date().getFullYear());

    $('.product-option input[type="radio"]').change(function () {
        $(this).parents('.product-option').siblings().removeClass("active");
        $(this).parents('.product-option').addClass("active");

    });

    $('[data-product-quantity]').on("change", function () {
        var newQuantity = $(this).val();
        var parent = $(this).parents('[data-product-info]');
        var price = parent.attr('data-product-price');
        var newPrice = newQuantity * price;
        parent.find('.total-price-for-product').text(newPrice + '$');
        subTotal();

    });

    $('[data-remove-from-cart]').on("click", function () {
        $(this).parents('[data-product-info]').remove();
        subTotal();
    })

    function subTotal() {
        var subTotal = 0;
        $("[data-product-info]").each(function () {
            var price = $(this).attr('data-product-price');

            var quantity = $(this).find('[data-product-quantity]').val();

            var totalPriceForProduct = price * quantity;
            subTotal = subTotal + totalPriceForProduct;
        });
        $('#total-price-for-all-products').text(subTotal + '$');
    }

    var citiesByCountry = {
        sa: ['الرياض', 'جدة'],
        jo: ['عمان', 'السلط'],
        ps: ['القدس', 'رام الله', 'غزة'],
        sy: ['دمشق', 'حلب']
    };

    $("#form-checkout select[name='country']").on("change", function () {
        var country = $(this).val();

        var cities = citiesByCountry[country];

        $('#form-checkout select[name="city"]').empty();
        $('#form-checkout select[name="city"]').append('<option disabled selected value="">اختر المدينة</option>');


        cities.forEach(function (city) {
            var newOption = $("<option></option>");
            newOption.text(city);
            newOption.val(city);
            $('#form-checkout select[name="city"]').append(newOption);

        });
    });

    $('#form-checkout input[name="payment_method"]').on("change", function () {
        var payment = $(this).val();

        if (payment == "credit_card") {
            $("#credit-card-info input").prop('disabled', false);
        } else {
            $("#credit-card-info input").prop('disabled', true);
        }

        $("#credit-card-info").toggle();
    });

    $(function () {
        $("#price-range").slider({
            range: true,
            min: 50,
            max: 1000,
            step: 50,
            values: [250, 800],
            slide: function (event, ui) {
                $("#price-min").text(ui.values[0]);
                $("#price-max").text(ui.values[1]);
            }
        });

    });
});