$(document).ready(function(){

    $.ajax({
        type: 'GET',
        url: '/api/clients',
        dataType: 'JSON'
    }).done(function( response ) {

        response.clients.forEach(client => {
            $('#tbl_users').append(
                `<tr>
                    <td>${client.id}
                    <td>${client.label}
                </tr>`
            )
        })

    });
})