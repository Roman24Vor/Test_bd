$(document).ready(function(){

    $.ajax({
        type: 'GET',
        url: '/api/order_statuses',
        dataType: 'JSON'
    }).done(function( response ) {

        response.status.forEach(status => {
            $('#tbl_users').append(
                `<tr>
                    <td>${status.id}
                    <td>${status.label}
                </tr>`
            )
        })

    });
})