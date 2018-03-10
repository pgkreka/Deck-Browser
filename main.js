$(function() {

    var carddataapi = "http://52.57.88.137/api/card_data/";
    var cardimageapi = "http://52.57.88.137/api/card_image/";
    var talistselector = ".tablist li";

    $( talistselector ).each(function( index ) {
        var thislist = $(this);
        var title = encodeURIComponent(thislist.text().trim());
        var httpresponse = carddataapi + title;
        
        var jqxhr = $.get( httpresponse, function( carddataresponse ) {
            var cardobject = $.parseJSON(carddataresponse);
            if( cardobject.status == 'success')
            {
                var cardtype = cardobject.data.card_type;
                thislist.find('span').html(cardtype);
            }
        })     
    });

    $( talistselector ).click(function() {
        $('.loader').show();
        $( talistselector ).removeClass('active');
        $(this).addClass('active');
        var title = encodeURIComponent($(this).find('h5').text().trim());
        var httpresponse = carddataapi + title;
       
        var jqxhr = $.get( httpresponse, function( carddataresponse ) {
            var cardobject = $.parseJSON(carddataresponse);
            if( cardobject.status == 'success')
            {
                var cardname = cardobject.data.name;
                var carddescription = cardobject.data.text;
                var carddetails = {
                    'Card Type' : cardobject.data.card_type, 
                    'Type' : cardobject.data.type , 
                    'Family' : cardobject.data.family , 
                    'Attack' : cardobject.data.atk , 
                    'Defense' : cardobject.data.def , 
                    'Level' : cardobject.data.level , 
                    'Property' : cardobject.data.property };

                $('.content .maintitle').html(cardname);             
                $('.content .description').html(carddescription);
                var carddetailshtml = '';
                $.each( carddetails, function( key, value ) {
                    carddetailshtml += key + ": " + value + '<br>';
                });
                $('.content .details').html(carddetailshtml);
            }
        })
        .done(function() {
            $( ".content .media .product-img img" ).attr("src", cardimageapi + title);
            setTimeout(function(){
                $('.loader').hide();        
            }, 300);
               
        })
        .fail(function() {
            $('.tablist').hide();
            alert('Cannot contact with API service');    
        })           
    });
    $( talistselector ).first().trigger('click');
});