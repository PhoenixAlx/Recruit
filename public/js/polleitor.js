// # Polleitor Client
// Cliente de **polleitor**

//Desarrollado por la Oficina de Software Libre bajo licencia MIT


// `getPoll(poll,done)` Obtiene la poll del servidor, ejecuta el callback `done(err,poll)`
function getPoll(poll, done) {
    $.ajax({
        url: '' + poll,
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

// `getAnswers(poll,done)` Similar a getPoll, pero incluye además las respuestas
function getAnswers(poll, done) {
    $.ajax({
        url: '' + poll + '/resultados',
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

// `postAnswers(poll,answers,done)` envía las respuestas a una poll, como un array de enteros, ejecuta el callback con el resultado del servidor
function postAnswers(poll, answers, done) {
    console.log(answers);
    $.ajax({
        url: '' + poll,
        type: "PUT",
        data: JSON.stringify({
            "answers": answers
        }),
        contentType: 'application/json',
        cache: false,
        success: function(data) {
            done(null, data);
        },
        error: function(xhr, status, err) {
            done(new Error(err));
        }
    });
}


// `plot_chart(poll_id,chart_id)` Dibuja los resultados de una poll en el objeto con id _chat\_id_
function plot_chart_hist(poll_id_set, chart_id) {
    
    
    var ctx = document.getElementById(chart_id);
    var data = {
            labels: [],
            datasets: []
    };
    var plot_options={
        legend: {
            display: true,
            position: 'right',
        },
        scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: '% answers',
                
              },
              ticks: {
                        beginAtZero: true,
                        steps: 10,
                        stepValue: 5,
                        max: 100
             }
            }]
        },
        responsive: true,
        maintainAspectRatio: false    
        
    }
    
    var myChart = new Chart(ctx, {type: "horizontalBar",data: data,options: plot_options});
    
    var color_poll={};
    var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC']
    for (var p=0; p<poll_id_set.length;p++){
        poll_id=poll_id_set[p];
        color_poll[poll_id]=default_colors[p];
    }
    for (var p=0; p<poll_id_set.length;p++){
        poll_id=poll_id_set[p];
        
        getAnswers(poll_id, function(error, answers) {
            console.log(answers);
            var answer = answers[0];
            var chart_label = answer.label;
            var datas_answer= answer.datas_answer;
            var datas_options = answer.options;
            var data_hist=[];
            
            for (var i=0; i<datas_options.length;i++){
                var count=0;
                var total_count=0;
                for (var j=0;j<datas_answer.length;j++){
                    if (datas_answer[j] == datas_options[i]){
                        count++;
                    }
                    total_count++;
                }
                data_hist.push(count*100/total_count);
            }
            console.log("color_poll[poll_id]");
            console.log(color_poll[answer.poll_name])
            var datas_dataset={
                        label: chart_label,
                        data: data_hist,
                        backgroundColor: color_poll[answer.poll_name],
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1
                };
            data.labels=datas_options;
            data.datasets.push(datas_dataset);
            myChart.update();
        });
    }
}
function plot_chart_sent(poll_id_set, chart_id) {
    
    
    var ctx = document.getElementById(chart_id);
    var data = {
            labels: [],
            datasets: []
    };
    var plot_options={
        legend: {
            display: true,
            position: 'right',
        },
        scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Puntuation 0 (most extreme negative) and 100 (most extreme positive)',
                
              },
              ticks: {
                        beginAtZero: true,
                        steps: 10,
                        stepValue: 5,
                        max: 100
             }
            }]
        },
        responsive: true,
        maintainAspectRatio: false    
        
    }
    var myChart = new Chart(ctx, {type: "horizontalBar",data: data,options: plot_options});
    
    var color_poll={};
    var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC']
    for (var p=0; p<poll_id_set.length;p++){
        poll_id=poll_id_set[p];
        color_poll[poll_id]=default_colors[p];
    }
    for (var p=0; p<poll_id_set.length;p++){
        poll_id=poll_id_set[p];
        
        getAnswers(poll_id, function(error, answers) {
            console.log(answers);
            var answer = answers[0];
            var chart_label = answer.label;
            var datas_answer= answer.datas_answer;
            var datas_options = answer.options;
            var datas_sents = parseFloat(answer.datas_sentiment);
            var data_hist=[datas_sents];
            console.log("color_poll[poll_id]");
            console.log(color_poll[answer.poll_name])
            var datas_dataset={
                        label: chart_label,
                        data: data_hist,
                        backgroundColor: color_poll[answer.poll_name],
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1
                };
            data.labels=datas_options;
            data.datasets.push(datas_dataset);
            myChart.update();
        });
    }
}
//obtenemos un texto formateado con parrafos de todas las preguntas y las respuestas
function list_answers(answer_id) {
    var this_div=$("#"+answer_id);
    this_div.empty();
    $(".poll").each(function() {
        var this_div_poll=$(this);
        var poll_id = this_div_poll.attr('data-poll-name');
        this_div.append("<div id='answer_order_"+poll_id+"'></div>");
        getAnswers(poll_id, function(error, answers) {
            console.log(answers);
            
            var answer = answers[0];
            var question = answer.question;
            var value=answer.answer_value;
            var label=answer.label
            if (value !='save'){
                var this_div_poll_order=$("#answer_order_"+poll_id);
                if (answer.type=="rank"){
                    this_div_poll_order.append("<p><u>Ranking " + question.replace("$1",label) + "</u> --> "+value+"</p>");
                }else{
                    this_div_poll_order.append("<p><u>" + question.replace("$1",label) + "</u> --> "+value+"</p>");
                }

            }
        });
        
    });

}


// Genera una poll para todos los objetos de clase poll en el html
$(function() {
    $(".poll").each(function() {
        var this_div = $(this);
        var name = this_div.attr('data-poll-name');
        var range_ranking="1,2,3,4"
        getPoll(name, function(err, res) {

            if (err) {
                console.log(err);
            } else {
                
                for (var i in res) {
                    //console.log(res);
                    //cogemos question
                    question=res[i].question;
                   
                    //miramos el type
                    type=res[i].type;
                    label=res[i].label;
                    if (type =="option"){
                        this_div.append("<p>" + question.replace("$1",label) + "</p>");
                        for (var j in res[i].options) {
                            this_div.append("<button round big  class='width-2 option q-answer ' type='primary' option-selected=false data-poll-max="+res[i].options.length+"  data-question='" + i + "' type-question='" + type +"' data-poll='" + name + "' id='" + j +  "' submited='" + res[i].submit + "' value-id='" + res[i].id + "' value='" + res[i].options[j] + "'name='" + name + "-" + j + "'>" + res[i].options[j] + "</button>");
                        }
                    }else if (type =="rank"){
                        question_total="<column cols='5'>"+question.replace("$1",label)+"</column> <column cols='4' ><select  name='select-"+name+"'><option disabled selected value> -- select an option -- </option>";
                        for (var j in res[i].options) {
                            var value_opt=parseInt(j)+1;
                            question_total=question_total+"<option  round big class=' small q-answer' data-question='" + i +"' type-question='" + type + "' data-poll='" + name + "' id='" + j + "' value-id='" + res[i].id + "' value='"+value_opt+"'><span >"+value_opt+"</span></option> ";
                        }
                        question_total=question_total+"</select></column>  ";
                        this_div.append(question_total)
                    }else if (type =="textarea"){
                        this_div.append("<p>" + question.replace("$1",label) + "</p>");
                        j=0;
                        this_div.append("<textarea round big  class='width-12 q-answer' type='primary' data-question='" + i +"' type-question='" + type + "' data-poll='" + name + "' id='" + j + "' value-id='" + res[i].id + "' value='" + res[i].id + "'name='" + name + "-" + j + "'></textarea>");
                    }
                    
                }
            }
        });

    });

});

//Binding a elementos generados dinámicamente según http://stackoverflow.com/questions/203198/event-binding-on-dynamically-created-elements
// Envía respuesta al realizar click
$(document).on("click", ".submit", function() {
    function Answer(id, answer) {
        this.id = id;
        this.answer = answer;
    }
    
    var answer = new Answer($(this).attr("value"), $(this).attr('id'));
    var name = $(this).attr('data-poll');
  
    console.log(answer);
    postAnswers(name, [answer], function(err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
});
$(document).on("click", ".option", function() {
    var name = $(this).attr('data-poll');
    $("button[name='" +name+"-"+ $(this).attr('id') + "']").each(function() {
        
        //disabled false el resto data-poll-max
        var number_options = $(this).attr('data-poll-max');
        var id =parseInt($(this).attr('id'));
       
        for (var i=0;i<number_options;i++){
            if (i!=(id)){
                console.log("rest_options")
               var rest_options=$("button[name='" +name+"-"+ i + "']");
               console.log(rest_options)
               rest_options.attr('disabled', false);
               rest_options.attr('option-selected', false);
           }
        }
        $(this).attr('disabled', true);
        $(this).attr('option-selected', true);
        var submited= ($(this).attr('submited') == 'true');
        if (submited){
            $(".q-answer").each(function() {
                var this_div = $(this);
                 console.log(' this_div************************** ')
                 console.log(this_div)
                
                //function Answer(id, answer) {
                    //this.id = id;
                    //this.answer = answer;
                //}
     
                //var answer = new Answer( $(this).attr('value-id'),$(this).attr("value"));
                var type = $(this).attr('type-question');
                if (type =="option"){
                    var selected = ($(this).attr('option-selected') =='true') ;

                    if (selected){
                        //save this datas
                        function Answer(id, answer) {
                            this.id = id;
                            this.answer = answer;
                        }
                        var answer = new Answer( $(this).attr('value-id'),$(this).attr("value"));
                        var name = $(this).attr('data-poll');

                        postAnswers(name, [answer], function(err, res) {

                            if (err) {
                                console.log(err);
                            } else {
                                console.log(res);
                            }
                        });
                    }
                }else if (type =="rank"){
                    
                    var name_select="select-"+$(this).attr("data-poll");
                    var select_value=$("select[name='"+name_select+"'").val();
                    
                    if (select_value!=null && $(this).attr("value") ==select_value){
                        function Answer(id, answer) {
                            this.id = id;
                            this.answer = answer;
                        }
                        var answer = new Answer( $(this).attr('value-id'),$(this).attr("value"));
                        var name = $(this).attr('data-poll');

                        postAnswers(name, [answer], function(err, res) {

                            if (err) {
                                console.log(err);
                            } else {
                                console.log(res);
                            }
                        });
                    }
                }else if (type =="textarea"){
                    var name_textarea=$(this).attr("name");
                    var select_value=$("textarea[name='"+name_textarea+"'").val();

                    
                    if (select_value.length>0){
                    
                        function Answer(id, answer) {
                                this.id = id;
                                this.answer = answer;
                        }
                        
                        
                        var answer = new Answer( $(this).attr('value-id'),select_value);
                        var name = $(this).attr('data-poll');
                        postAnswers(name, [answer], function(err, res) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(res);
                            }
                        });
                    }
                }
            });
            location.reload();
        }
        
    });
    
});
