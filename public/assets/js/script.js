//Store each room section as element.
room_object = [];
//Total hour store
total_h = 0;
//Helper for room control
iRoom = 0;

cb_state = [];
//["cb_ro0_b0,false","cb_ro0_b1,false","cb_ro0_b2,false","cb_ro1_b0,false"];


document.body.scrollTop = 1000;

function Room(id, name, labor_order, cb_count) {
    this.id = id;
    this.name = name;
    this.labor_order = labor_order;
    this.cb_count = cb_count;
};

$(document).ready(function (){


    $(document).on("click", "#save_state_bt", function (){
        $("#the_room_object").val(JSON.stringify(room_object));
        $("#the_hour").val(total_h);
        $("#the_iRoom").val(iRoom);
        var html_string = '<!DOCTYPE HTML>' + '\n' + document.documentElement.outerHTML;
        $("#the_html").val(html_string);
        var cb_states = [];
        $(".complete_cb").each(function () {
            cb_states.push(`"${this.id},${$(this).is(':checked')}"`);
        })
        $("#cb_states").val(cb_states);
    });
    

    //current date
    $("#date_hd").text(() => {
        var month_now = new Date().getMonth();
        var year_now = new Date().getFullYear();
        var date_now = new Date().getDate();
        return `Today: ${month_now}/${date_now}/${year_now}`
    }); 
    
    //Adding room
    $("#add_room_bt").click((e)=>{
        var rname = $("#room_name_input").val();
        if (!rname){ 
            alert("Please put in a name first");
            return e;
        }   
        var new_room = new Room(iRoom, rname, 0, 0);
        room_object.push(new_room);
        var new_div = `<div id=room${iRoom} class="room_sec">\r\n`
                      + `<h4 class="room_hd" style="text-align: center;">${rname}</h4>\r\n`
                      + `<div class="table_col">\r\n`
                      + `<p style="text-align: center; margin-top: 15px;margin-bottom: 15px;" > Hr </p>\r\n`
                      + `<p style="text-align: center; margin-top: 15px;margin-bottom: 15px;" > Labor </p>\r\n`
                      + `<p style="text-align: right; margin-top: 15px; margin-bottom: 15px; margin-right: 1vw;" > Done </p>\r\n`
                      + `</div>\r\n`
                      + `</div>\r\n`
                      + `<div id="container">\r\n`
                      + `<button type="button" name="Add labor" id="add_bt${iRoom}" class="add_labor_bt all_buttons" style="font-weight: bold; margin-top: 10px; margin-left: 35%; width: 15%;"> <span> &#43; </span> </button>\r\n`
                      + `<button type="button" name="Submit" id="sub_labor_bt${iRoom}" class="sub_labor_bt all_buttons" style="font-weight: bold; margin-top: 10px; margin-left: 15%; width: 15%;"> <span>&#10004;</span> </button>\r\n`
                      + `</div>\r\n`;
        iRoom = iRoom + 1;
        html = $.parseHTML(new_div);
        $("#main_div").append(html);
        $("#room_name_input").val("");
    });


    $(document).on("click", ".add_labor_bt", function (){
      //Adding labor to specific room
      var clicked_id = $(this).attr("id").slice(-1);
      var clicked_room_id_selector = "#room"+clicked_id;
      var this_cb_count = room_object[parseInt(clicked_id)].cb_count;
      var new_labor_line = `<div class="border">\r\n`  
                         +`<div class="labor_container">\r\n`
                         + `<input type="text" placeholder="Hour ..." style="font-style: italic; font-size: 23px;" class="hour_input${clicked_id}">\r\n`
                         + `<input type="text" placeholder="Type of the labor ..." style="font-style: italic; font-size: 23px;" class="labor_input${clicked_id}">\r\n`
                         + `<input type="checkbox" class="complete_cb" style="margin-left: 1em;" id="cb_ro${clicked_id}_b${this_cb_count}" name="complete_name" value="complele_val">\r\n`
                         + `</div>\r\n`
                         + `</div>\r\n`;
      room_object[parseInt(clicked_id)].cb_count+=1;
      $(`${clicked_room_id_selector}`).append(new_labor_line);

      $(`#cb_ro${clicked_id}_b${this_cb_count}`).hide();
    });

    $(document).on("click", ".sub_labor_bt", function (){
      //handle submit button
      var clicked_id = $(this).attr("id").slice(-1);
      var labor_list = $(`.labor_input${clicked_id}`);
      var current_order = room_object[parseInt(clicked_id)].labor_order;
      
      $.each(labor_list, function(idx, val) {
        // Change the labor title
        var new_elem = document.createElement("p");
        new_elem.setAttribute("id", `labor_ro${clicked_id}_or${current_order}`);
        new_elem.setAttribute("class", "labor_task_cl");
        new_elem.setAttribute("style", "text-align: center;");
        new_elem.innerHTML = val.value;

        // Show the checkbox when submitted
        $(`#cb_ro${clicked_id}_b${current_order}`).show();
        val.replaceWith(new_elem);
        current_order+=1;
      })

      //Change the labor hour
      current_order = room_object[parseInt(clicked_id)].labor_order;
      var hour_list = $(`.hour_input${clicked_id}`);
      $.each(hour_list, function(idx, val) {
          var new_elem = document.createElement("p");
          new_elem.setAttribute("id", `hour_ro${clicked_id}_or${current_order}`);
          new_elem.setAttribute("class", "labor_task_cl");
          new_elem.setAttribute("style", "text-align: center;");
          new_elem.innerHTML = val.value;
          val.replaceWith(new_elem);
          current_order+=1;

          //add up total hour
          total_h+=parseFloat(val.value);
          
          $("#total_hour").text(`Total hour: ${total_h}`);
      })

      //update number of labors for this room
      room_object[parseInt(clicked_id)].labor_order = current_order;
    });
});

$(document).ready(function () {
    for (var i = 0; i < cb_state.length ; i++) { 
        var id = cb_state[i].split(',')[0];
        var state = cb_state[i].split(',')[1];
        $(`#${id}`).attr('checked', JSON.parse(state));
        
    }
});