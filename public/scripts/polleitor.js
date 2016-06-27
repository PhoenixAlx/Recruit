function getPoll(poll,done){
    $.ajax({
			url: '/'+poll,
			type: "GET",
			cache: false,
			success: function(data) {
				done(null, data);
			},
			error: function(xhr, status, err) {
				done(new Error(err));
			}
		});    
}

function getAnswers(poll,done){
    $.ajax({
            url: '/'+poll+'/resultados',
            type: "GET",
            cache: false,
            success: function(data) {
                done(null, data);
            },
            error: function(xhr, status, err) {
                done(new Error(err));
            }
        });      
}
function postAnswers(poll,answers,done){
    $.ajax({
            url: '/'+poll,
            type: "POST",
            data: answers,
            dataType: 'json',
            cache: false,
            success: function(data) {
                done(null, data);
            },
            error: function(xhr, status, err) {
                done(new Error(err));
            }
        });      
}

$(function(){
    var name=$(".poll").attr('data-poll-name');
    console.log(name);
    getPoll(name,function(err,res){
        if(err) console.log(err);
        else {
            $(".poll").text(JSON.stringify(res));
        }
    });
});
