$(document).ready(function(){

    $('#add_item').click(function(e){

        $('#add_item_popup').show()

    })

    $('#add_item_popup_close').click(function(e){

        $('#add_item_popup').hide()

    })

    $('#cancel_add_item').click(function(e){

        $('#add_item_popup').hide()

    })

    $('#submit_add_item').click(function(e){

        e.preventDefault()
        let data = {
            label:    $('#inpLabel').val(),
            id_order: $('#inpOrder').val(),
            amount: $('#inpAmount').val(),
        }

        $.ajax({
            type: 'POST',
            data: data,
            url: '/order_items/add-items',
            dataType: 'JSON'
        }).done(function( response ) {

            if (response.msg === '') {
                alert('Предмет создан')
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
            url: '/api/order_items',
            dataType: 'JSON'
        }).done(function( response ) {
    
            response.order_items.forEach(item => {
                $('#tbl_order_items').append(
                    `<tr>
                        <td>${item.id}
                        <td>${item.label}
                        <td>${item.id_order}
                        <td>${item.amount}
                    </tr>`
                )
            })
    
        });
    })
    
});

