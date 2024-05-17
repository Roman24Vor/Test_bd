$(document).ready(function(){

    $('#add_payment').click(function(e){

        $('#add_payment_popup').show()

    })

    $('#add_payment_popup_close').click(function(e){

        $('#add_payment_popup').hide()

    })

    $('#cancel_add_payment').click(function(e){

        $('#add_payment_popup').hide()

    })

    $('#submit_add_payment').click(function(e){

        e.preventDefault()
        let data = {
            id_order: $('#inpOrder').val(),
            id_payment_type: $('#inpTypePayment').val(),
            amount: $('#inpAmount').val()
        }

        $.ajax({
            type: 'POST',
            data: data,
            url: '/payments/change',
            dataType: 'JSON'
        }).done(function( response ) {

            if (response.msg === '') {
                alert('Оплата изменена')
                window.location.reload()
            }
            else {
                alert(response.msg)
            }
        });

    })

    $(document).ready(function(){

        $.ajax({
            type: 'GET',
            url: '/api/payments',
            dataType: 'JSON'
        }).done(function( response ) {
    
            response.orders.forEach(order => {
                $('#add_payment').append(
                    `<tr>
                    <td>${order.id}
                    <td>${order.label}
                    <td>${order.id_status}
                    <td>${order.id_client}
                    <td>${order.amount}
                    </tr>`
                )
            })
    
        });
    })

    $(document).ready(function(){

        $.ajax({
            type: 'GET',
            url: '/api/payments',
            dataType: 'JSON'
        }).done(function( response ) {
    
            response.paymentType.forEach(type => {
                $('#add_payment').append(
                    `<tr>
                        <td>${type.id}
                        <td>${type.label}
                    </tr>`
                )
            })
    
        });
    })
    
});

