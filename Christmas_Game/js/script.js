var cur_pop = 1, food = 10, day = 1, wood = 0, wood_beams = 0, clay = 0, copper = 0, iron = 0, titanium = 0, myTimer;
var max_pop = 1, food_max = 100, wood_max = 100, wood_beams_max = 100, clay_max = 100, copper_max = 100, iron_max = 100, titanium_max = 100;
var builder_rest = 0, builder_hut_rep = 0, builder_hut_build = 0, builder_warehouse_food = 0;
var resting = 0, forager = 0, wood_collector = 0, wood_cutter = 0, builder = 0, welder = 0, alchemist = 0, scientist = 0; 
var foraging_rate=1.5, lvl = 1;
var pause = true, rate=1000, starving = 0;

function pause_button(){
	if(pause) {
		document.getElementById("pause_button_text").innerHTML = "Pause (q)";
		document.getElementById("button_pause").style="background-color:#adf";
		pause=false;
	} else{
		document.getElementById("pause_button_text").innerHTML = "Unpause (q)";
		document.getElementById("button_pause").style="background-color:#f54";
		pause=true;
	}
}

function quick_save(){
	var code;
	
	
	return code;
}

document.onkeyup = function(e) {
  if (e.which == 81) pause_button();
};


function restart(){
	max_pop = 1;
	cur_pop = 1;
	foraging_rate = 1.5;
	lvl = 1;
	food = 10;
	day = 1;
	wood = 0;
	wood_beams = 0;
	resting = 0;
	forager = 0;
	wood_collector = 0;
	wood_cutter = 0;
	builder = 0;
	welder = 0;
	alchemist = 0;
	scientist = 0;
	builder_rest = 0;
	builder_hut_rep = 0;
	builder_hut_build = 0;
	builder_warehouse_food = 0;
	
	/*Renew all the boxes in the file*/
	document.getElementById("Food_n").innerHTML=food;
	document.getElementById("cur_pop").innerHTML=1;
	document.getElementById("Day_n").innerHTML=1;
	document.getElementById("max_pop").innerHTML=1;
	document.getElementById("Wood_n").innerHTML=0;
	document.getElementById("resting_indic").innerHTML=0;
	document.getElementById("foragers_indic").innerHTML=0;
	document.getElementById("wood_collectors_indic").innerHTML=0;
	document.getElementById("wood_cutters_indic").innerHTML=0;
	document.getElementById("hut_rep_build_indic").innerHTML=0;
	document.getElementById("resting_build_indic").innerHTML=0;
	
	
	
	//Reset the name of your land
	document.getElementById("village_name_stats").innerHTML = "Your piece of land";
	
	
	// Hide all the discovered buttons
	document.getElementById("bulders_pop_row").style.visibility="hidden";
	document.getElementById("Builder_button").style.visibility="hidden";
	document.getElementById("Welder_button").style.visibility="hidden";
	document.getElementById("Alchemist_button").style.visibility="hidden";
	document.getElementById("Scientist_button").style.visibility="hidden";
	
	//Remove game over square
	document.getElementById("Game_Over_menu").style.display="none";
	document.getElementById("wrapper").classList.remove("blurred_div");
	
	// Reveal only the woods part
	document.getElementById("local_area").style.display = 'block';
	document.getElementById("map_area").style.display = 'none';
	document.getElementById("builder_area").style.display = 'none';
	document.getElementById("welder_area").style.display = 'none';
	document.getElementById("alchemist_area").style.display = 'none';
	document.getElementById("scientist_area").style.display = 'none';
	document.getElementById("local_menu").style.display = 'block';
	document.getElementById("map_menu").style.display = 'none';
	document.getElementById("builder_menu").style.display = 'none';
	document.getElementById("welder_menu").style.display = 'none';
	document.getElementById("alchemist_menu").style.display = 'none';
	document.getElementById("scientist_menu").style.display = 'none';
	
	
	//Pausing the game
	document.getElementById("pause_button_text").innerHTML = "Unpause (q)";
	document.getElementById("button_pause").style="background-color:#f54";
	pause=true;
	
	myTimer = setInterval(onTick, rate);
}



function toggle_collapsible(){
	var newvar;
	newvar=document.getElementById("recipe_bar_info").style.display;
	if(newvar=="none"){
		document.getElementById("recipe_bar_info").style.display="block";
	} else{
		document.getElementById("recipe_bar_info").style.display="none";
	}
}

function buildHutExplain(){
	
}


//lvl = 1 - pop < 10
//lvl = 2 - pop between 10 and 100 - reveal builder
//lvl = 3 - pop between 100 and 5000 - reveal welder
//lvl = 4 - pop between 5000 and 200000 - reveal alchemist
//lvl = 5 - pop between 200000 and 5000000 - reveal scientist
//lvl = 6 - pop more than 5000000 - reveal santa claus on the map

function upGrade(pop) {
	if(lvl == 1 && pop >= 10){
		document.getElementById("village_name_line").innerHTML = "Your cottage";
		document.getElementById("bulders_pop_row").style.visibility="visible";
		document.getElementById("Builder_button").style.visibility="visible";
	}
	if(lvl == 2 && pop >= 100){
		document.getElementById("village_name_line").innerHTML = "Your hamlet";
		document.getElementById("welders_pop_row").style.visibility="visible";
		document.getElementById("Welder_button").style.visibility="visible";
	}
	if(lvl == 3 && pop >= 5000){
		document.getElementById("village_name_line").innerHTML = "Your village";
		document.getElementById("alchemists_pop_row").style.visibility="visible";
		document.getElementById("Alchemist_button").style.visibility="visible";
	}
	if(lvl == 4 && pop >= 200000){
		document.getElementById("village_name_line").innerHTML = "Your town";
		document.getElementById("scientists_pop_row").style.visibility="visible";
		document.getElementById("Scientist_button").style.visibility="visible";
	}
	if(lvl == 5 && pop >= 5000000){
		document.getElementById("village_name_line").innerHTML = "Your city";
		document.getElementById("bulders_pop_row").style.visibility="visible";
		document.getElementById("Builder_button").style.visibility="visible";
	}
	return;
}

/*Buttons on the left regulating the interaction area*/

function showWo(){
	document.getElementById("local_area").style.display = 'block';
	document.getElementById("map_area").style.display = 'none';
	document.getElementById("builder_area").style.display = 'none';
	document.getElementById("welder_area").style.display = 'none';
	document.getElementById("alchemist_area").style.display = 'none';
	document.getElementById("scientist_area").style.display = 'none';
	document.getElementById("local_menu").style.display = 'block';
	document.getElementById("map_menu").style.display = 'none';
	document.getElementById("builder_menu").style.display = 'none';
	document.getElementById("welder_menu").style.display = 'none';
	document.getElementById("alchemist_menu").style.display = 'none';
	document.getElementById("scientist_menu").style.display = 'none';
}

function showM(){
	document.getElementById("local_area").style.display = 'none';
	document.getElementById("map_area").style.display = 'block';
	document.getElementById("builder_area").style.display = 'none';
	document.getElementById("welder_area").style.display = 'none';
	document.getElementById("alchemist_area").style.display = 'none';
	document.getElementById("scientist_area").style.display = 'none';
	document.getElementById("local_menu").style.display = 'none';
	document.getElementById("map_menu").style.display = 'block';
	document.getElementById("builder_menu").style.display = 'none';
	document.getElementById("welder_menu").style.display = 'none';
	document.getElementById("alchemist_menu").style.display = 'none';
	document.getElementById("scientist_menu").style.display = 'none';
}

function showB(){
	document.getElementById("local_area").style.display = 'none';
	document.getElementById("map_area").style.display = 'none';
	document.getElementById("builder_area").style.display = 'block';
	document.getElementById("welder_area").style.display = 'none';
	document.getElementById("alchemist_area").style.display = 'none';
	document.getElementById("scientist_area").style.display = 'none';
	document.getElementById("local_menu").style.display = 'none';
	document.getElementById("map_menu").style.display = 'none';
	document.getElementById("builder_menu").style.display = 'block';
	document.getElementById("welder_menu").style.display = 'none';
	document.getElementById("alchemist_menu").style.display = 'none';
	document.getElementById("scientist_menu").style.display = 'none';
}

function showWe(){
	document.getElementById("local_area").style.display = 'none';
	document.getElementById("map_area").style.display = 'none';
	document.getElementById("builder_area").style.display = 'none';
	document.getElementById("welder_area").style.display = 'block';
	document.getElementById("alchemist_area").style.display = 'none';
	document.getElementById("scientist_area").style.display = 'none';
	document.getElementById("local_menu").style.display = 'none';
	document.getElementById("map_menu").style.display = 'none';
	document.getElementById("builder_menu").style.display = 'none';
	document.getElementById("welder_menu").style.display = 'block';
	document.getElementById("alchemist_menu").style.display = 'none';
	document.getElementById("scientist_menu").style.display = 'none';
}

function showA(){
	document.getElementById("local_area").style.display = 'none';
	document.getElementById("map_area").style.display = 'none';
	document.getElementById("builder_area").style.display = 'none';
	document.getElementById("welder_area").style.display = 'none';
	document.getElementById("alchemist_area").style.display = 'block';
	document.getElementById("scientist_area").style.display = 'none';
	document.getElementById("local_menu").style.display = 'none';
	document.getElementById("map_menu").style.display = 'none';
	document.getElementById("builder_menu").style.display = 'none';
	document.getElementById("welder_menu").style.display = 'none';
	document.getElementById("alchemist_menu").style.display = 'block';
	document.getElementById("scientist_menu").style.display = 'none';
}

function showS(){
	document.getElementById("local_area").style.display = 'none';
	document.getElementById("map_area").style.display = 'none';
	document.getElementById("builder_area").style.display = 'none';
	document.getElementById("welder_area").style.display = 'none';
	document.getElementById("alchemist_area").style.display = 'none';
	document.getElementById("scientist_area").style.display = 'block';
	document.getElementById("local_menu").style.display = 'none';
	document.getElementById("map_menu").style.display = 'none';
	document.getElementById("builder_menu").style.display = 'none';
	document.getElementById("welder_menu").style.display = 'none';
	document.getElementById("alchemist_menu").style.display = 'none';
	document.getElementById("scientist_menu").style.display = 'block';
}

/*Functions regulating the local action area*/

function pickW(){
	if (pause || wood == wood_max) return;
	wood += 1;
	document.getElementById("Wood_n").innerHTML=wood;
}

function pickF(){
	if (pause || food == food_max) return;
	food += 1;
	document.getElementById("Food_n").innerHTML=food;
}

function cutW(){
	if (pause || wood_beams == wood_beams_max) return;
	if (wood) {
		wood -= 1;
		wood_beams += 1;
		document.getElementById("Wood_n").innerHTML = wood;
		document.getElementById("WBeam_n").innerHTML = wood_beams;
	}
}

function buildH(){
	if (pause) return;
	if (wood >= 10 && wood_beams >= 20){
		wood -= 10;
		wood_beams -= 20;
		max_pop += 1;
		document.getElementById("Wood_n").innerHTML = wood;
		document.getElementById("WBeam_n").innerHTML = wood_beams;
		document.getElementById("max_pop").innerHTML = max_pop;
	}
}

/*The functions controlling the buttons for the quantity of foragers*/

function change_foragers(){
	var vl = parseInt(document.getElementById("pop_input_text_foragers").value);
	document.getElementById("pop_input_text_foragers").value="";
	if(isNaN(vl) || vl < 0 || resting < vl - forager) return;
	resting -= vl - forager;
	forager = vl;
	document.getElementById("foragers_indic").innerHTML = forager;
	document.getElementById("resting_indic").innerHTML = resting;
}

function add_forager(){
	if(resting < 1) return;
	resting -= 1;
	forager += 1;
	document.getElementById("foragers_indic").innerHTML = forager;
	document.getElementById("resting_indic").innerHTML = resting;
}

function rm_forager(){
	if(forager < 1) return;
	resting += 1;
	forager -= 1;
	document.getElementById("foragers_indic").innerHTML = forager;
	document.getElementById("resting_indic").innerHTML = resting;
}

/*The functions controlling the buttons for the quantity of wood collectors*/

function change_wood_collectors(){
	var vl = parseInt(document.getElementById("pop_input_text_wood_collectors").value);
	document.getElementById("pop_input_text_wood_collectors").value="";
	if(isNaN(vl) || vl < 0 || resting < vl - wood_collector ) return;
	resting -= vl - wood_collector;
	wood_collector = vl;
	document.getElementById("wood_collectors_indic").innerHTML = wood_collector;
	document.getElementById("resting_indic").innerHTML = resting;
}

function add_wood_collector(){
	if(resting < 1) return;
	resting -= 1;
	wood_collector += 1;
	document.getElementById("wood_collectors_indic").innerHTML = wood_collector;
	document.getElementById("resting_indic").innerHTML = resting;
}

function rm_wood_collector(){
	if(wood_collector < 1) return;
	resting += 1;
	wood_collector -= 1;
	document.getElementById("wood_collectors_indic").innerHTML = wood_collector;
	document.getElementById("resting_indic").innerHTML = resting;
}

/*The functions controlling the buttons for the quantity of wood cutters*/

function change_wood_cutters(){
	var vl = parseInt(document.getElementById("pop_input_text_wood_cutters").value);
	document.getElementById("pop_input_text_wood_cutters").value="";
	if(isNaN(vl) || vl < 0 || resting < vl - wood_cutter) return;
	resting -= vl - wood_cutter;
	wood_cutter = vl;
	document.getElementById("wood_cutters_indic").innerHTML = wood_cutter;
	document.getElementById("resting_indic").innerHTML = resting;
}

function add_wood_cutter(){
	if(resting < 1) return;
	resting -= 1;
	wood_cutter += 1;
	document.getElementById("wood_cutters_indic").innerHTML = wood_cutter;
	document.getElementById("resting_indic").innerHTML = resting;
}

function rm_wood_cutter(){
	if(wood_cutter < 1) return;
	resting += 1;
	wood_cutter -= 1;
	document.getElementById("wood_cutters_indic").innerHTML = wood_cutter;
	document.getElementById("resting_indic").innerHTML = resting;
}

/*The functions controlling the buttons for the quantity of builders*/

function change_builder(){
	var vl = parseInt(document.getElementById("pop_input_text_builder").value);
	document.getElementById("pop_input_text_builder").value="";
	if(isNaN(vl) || vl < builder || resting < vl - builder) return;
	resting -= vl - builder;
	builder = vl;
	builder_rest += vl - builder;
	document.getElementById("builder_indic").innerHTML = builder;
	document.getElementById("resting_indic").innerHTML = resting;
	document.getElementById("resting_build_indic").innerHTML = builder_rest;
}

function add_builder(){
	if(resting < 1) return;
	resting -= 1;
	builder += 1;
	builder_rest += 1;
	document.getElementById("builders_indic").innerHTML = builder;
	document.getElementById("resting_indic").innerHTML = resting;
	document.getElementById("resting_build_indic").innerHTML = builder_rest;
	
}

/*The functions controlling the buttons for the hut reparation crew*/

function change_hut_rep(){
	var vl = parseInt(document.getElementById("pop_input_text_hut_rep_build").value);
	document.getElementById("pop_input_text_hut_rep_build").value="";
	if(isNaN(vl) || vl < 0 || builder_rest < vl - hut_rep_pop ) return;
	builder_rest -= vl - hut_rep;
	hut_rep_pop = vl;
	document.getElementById("hut_rep_build_indic").innerHTML = hut_rep_pop;
	document.getElementById("resting_build_indic").innerHTML = builder_rest;
}

function add_hut_rep_build(){
	if(builder_rest < 1) return;
	builder_rest -= 1;
	hut_rep += 1;
	document.getElementById("hut_rep_build_indic").innerHTML = hut_rep;
	document.getElementById("resting_build_indic").innerHTML = builder_rest;
}

function rm_hut_rep_build(){
	if(hut_rep < 1) return;
	hut_rep -= 1;
	builder_rest += 1;
	document.getElementById("hut_rep_build_indic").innerHTML = hut_rep;
	document.getElementById("resting_build_indic").innerHTML = builder_rest;
}

/*The functions controlling the buttons for the hut building comittee*/

function change_hut_build(){
	var vl = parseInt(document.getElementById("pop_input_text_hut_build_build").value);
	document.getElementById("pop_input_text_hut_build_build").value="";
	if(isNaN(vl) || vl < 0 || builder_rest < vl - hut_build_pop ) return;
	builder_rest -= vl - hut_build_pop;
	hut_build_pop = vl;
	document.getElementById("hut_rep_build_indic").innerHTML = hut_build_pop;
	document.getElementById("resting_build_indic").innerHTML = builder_rest;
}

function add_hut_rep_build(){
	if(builder_rest < 1) return;
	builder_rest -= 1;
	hut_build_pop += 1;
	document.getElementById("hut_build_build_indic").innerHTML = hut_build_pop;
	document.getElementById("resting_build_indic").innerHTML = builder_rest;
}

function rm_hut_rep_build(){
	if(hut_rep_pop < 1) return;
	hut_build_pop -= 1;
	builder_rest += 1;
	document.getElementById("hut_build_build_indic").innerHTML = hut_build_pop;
	document.getElementById("resting_build_indic").innerHTML = builder_rest;
}

/*The functions controlling the buttons for the warehouse of food*/

function change_hut_rep(){
	var vl = parseInt(document.getElementById("pop_input_text_hut_rep_build").value);
	document.getElementById("pop_input_text_hut_rep_build").value="";
	if(isNaN(vl) || vl < 0 || builder_rest < vl - hut_rep_pop ) return;
	builder_rest -= vl - hut_rep_pop;
	hut_rep_pop = vl;
	document.getElementById("hut_rep_build_indic").innerHTML = hut_rep_pop;
	document.getElementById("resting_build_indic").innerHTML = builder_rest;
}

function add_hut_rep_build(){
	if(builder_rest < 1) return;
	builder_rest -= 1;
	hut_rep_pop += 1;
	document.getElementById("hut_rep_build_indic").innerHTML = hut_rep_pop;
	document.getElementById("resting_build_indic").innerHTML = builder_rest;
}

function rm_hut_rep_build(){
	if(hut_rep_pop < 1) return;
	hut_rep_pop -= 1;
	builder_rest += 1;
	document.getElementById("hut_rep_build_indic").innerHTML = hut_rep_pop;
	document.getElementById("resting_build_indic").innerHTML = builder_rest;
}



/*The function that runs every second is here*/
/*This function is called every second, even when the game is paused*/

function onTick(){
	var rand1 = Math.random();
	var rand2 = Math.random();
	document.getElementById("var_food").innerHTML = food;
	document.getElementById("var_cur_pop").innerHTML = cur_pop;
	document.getElementById("var_max_pop").innerHTML = max_pop;
	document.getElementById("var_wood").innerHTML = wood;
	document.getElementById("var_wood_beams").innerHTML = wood_beams;
	document.getElementById("var_forager").innerHTML = forager;
	document.getElementById("var_wood_collector").innerHTML = wood_collector;
	document.getElementById("var_wood_cutter").innerHTML = wood_cutter;
	document.getElementById("var_rand1").innerHTML = rand1;
	document.getElementById("var_rand2").innerHTML = rand2;
	document.getElementById("var_food_max").innerHTML = food_max;
	document.getElementById("var_wood_max").innerHTML = wood_max;
	document.getElementById("var_wood_beams_max").innerHTML = wood_beams_max;
	document.getElementById("var_clay_max").innerHTML = clay_max;
	document.getElementById("var_copper_max").innerHTML = copper_max;
	document.getElementById("var_iron_max").innerHTML = iron_max;
	document.getElementById("var_titanium_max").innerHTML = titanium_max;
	document.getElementById("var_starving").innerHTML = starving;
	document.getElementById("var_builder").innerHTML = builder_rest;
	document.getElementById("var_builder_rest").innerHTML = builder_rest;
	document.getElementById("var_builder_hut_rep").innerHTML = builder_hut_rep;
	document.getElementById("var_builder_hut_build").innerHTML = builder_hut_build;
	document.getElementById("var_builder_warehouse_food").innerHTML = builder_warehouse_food;
	
	
	
	if(pause) return 0;
	day += 1;
	document.getElementById("Day_n").innerHTML = day;
	if(forager){
		//Run model for foraging
		//food += zero_inflated_poisson(forager * foraging_rate, Math.random(), 0.3);
		food+= 2*forager;
	}
	if(food >= cur_pop){
		starving = 0;
		document.getElementById("pickF").classList.remove("button_glow");
		food -= cur_pop;
		if(cur_pop < max_pop){
			//Run model of aquiring people. Depends on somethings funny like a "likability" variable?
			var new_pop = poisson((max_pop - cur_pop)/60, Math.random(), max_pop - cur_pop);
			cur_pop += new_pop;
			resting += new_pop;
			document.getElementById("cur_pop").innerHTML = cur_pop;
			document.getElementById("resting_indic").innerHTML = resting;
			upGrade(cur_pop);
		}
		if(wood_collector){
			wood += wood_collector;
		}
		if(wood_cutter){
			if(wood_cutter <= wood){
				wood -= wood_cutter;
				wood_beams += wood_cutter;
			} else{
				wood_beams += wood;
				wood = 0;
			}
		}
		
		if(food > food_max) food = food_max;
		if(wood > wood_max) wood = wood_max;
		if(wood_beams > wood_beams_max) wood_beams = wood_beams_max;
		if(clay > clay_max) clay = clay_max;
		if(copper > copper_max) copper = copper_max;
		if(iron > iron_max) iron = iron_max;
		if(titanium > titanium_max) titanium = titanium_max;
		
		document.getElementById("Food_n").innerHTML = food;
		document.getElementById("Wood_n").innerHTML = wood;
		document.getElementById("WBeam_n").innerHTML = wood_beams;
	} else {
		food = 0;
		if (starving >=3 ){
			clearInterval(myTimer);
			document.getElementById("wrapper").classList.add("blurred_div");
			document.getElementById("GO_days").innerHTML = day;
			document.getElementById("Game_Over_menu").style.display="block";
		} else {
			starving += 1;
			document.getElementById("pickF").classList.add("button_glow");
		}
	}
}
myTimer = setInterval(onTick, rate);