//set the text in the input to be whatever is stored in local storage.
document.getElementById("input").value = localStorage.getItem("USR_VIN");

//initialize and define all variables 
var MODEL             = "";  //returns the model type --- result.Model
var MODEL_YEAR        = ""; //returns the model year --- result.ModelYear
var MAKE              = ""; //returns the manufacturer --- result.Make
var DRIVE_TYPE        = ""; //returns the Drive type for the vehicle ex. 4WD or AWD --- result.DriveType
var FUEL_TYPE         = ""; //returns the fuel type for the vehicle. --- result.FuelTypePrimary
var ERROR_CODE        = ""; //returns any error codes found for the VIN --- result.ErrorCode
var ERROR_TEXT        = ""; //returns any error codes in text form for the VIN --- result.ErrorText
var ENGINE_CYLINDERS  = ""; //returns how many cylinders the engine has. --- result.EngineCylinders
var ENGINE_HP         = ""; //returns how many Horse power the Engine has. --- result.EngineHP
var SEATS             = ""; //returns how many seats the vehicle has. --- result.Seats
var SEAT_ROWS         = ""; //returns how many rows the vehicle has --- result.SeatRows
var TOP_SPEED         = ""; //returns the top speed for the vehicle. --- result.TopSpeedMPH
var VEHICLE_TYPE      = ""; //returns the vehicle type --- result.VehicleType
var USR_VIN           = ""; //user input for vin number.  

//example vin numbers 
//--- 1C4PJLCB5HW650865 -- jeep cherokee
//--- WVGAV7AX2HK021857 -- volkswagen tiguan
//--- KL8CF6SA5KC762366 -- chevy spark
//--- 5YJ3E1EB4MF849621 -- tesla model 3
//--- WP0CA2A9XKS129194 -- porsche 911


//create variables for the elements in the html that we will be changing often. 
var model_text        = document.getElementById("model");
var model_year_text   = document.getElementById("model-year");
var make_text         = document.getElementById("make");
var user_vin_text     = document.getElementById("user-vin");
var drive_type_text   = document.getElementById("drive-type");
var fuel_type_text    = document.getElementById("fuel type"); 
var error_code_number = document.getElementById("error-code");
var error_code_text   = document.getElementById("error-text");
var cylinders_text    = document.getElementById("cylinder");
var engine_hp_text    = document.getElementById("engine-hp");
var seats_text        = document.getElementById("seats");
var rows_text         = document.getElementById("rows");
var top_speed_text    = document.getElementById("top-speed");
var vehicle_type_text = document.getElementById("vehicle-type");
var vehicle_type_h1   = document.getElementById("type");

//set all the headers to not display on page load.
document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("vehicle-image").style.display = "none";
  document.getElementById("info").style.display = "none";
  document.getElementById("errors").style.display = "none";
  document.getElementById("VIN").style.display = "none";
});




//The following section of code is used to add an event listener to the submit button.
//if the submit button is clicked then we prevent default and retrieve the VIN provided by the user. 
//in this section we are also setting the display to none for all the info blocks so that each time a new VIN is searched we can verify the 
//VIN is valid prior to displaying the data fields. 
//We are also saving the users provided VIN in local storage so that when the page is refreshed the previous value for the VIN will still be in the search box.
document.querySelector("#submit").addEventListener("click", function(event){
  event.preventDefault();
  USR_VIN = document.getElementById("input").value;
  document.getElementById("vehicle-image").style.display = "none";
  document.getElementById("info").style.display = "none";
  document.getElementById("errors").style.display = "none";
  document.getElementById("VIN").style.display = "inline";
 
  localStorage.setItem("USR_VIN",document.getElementById("input").value);//use local storage to save the users inputss
  
  //the following block of code is used to send the VIN provided by the user to the api and propagate the page based on the response.
  $.ajax({
	  url: "https://vpic.nhtsa.dot.gov/api//vehicles/DecodeVinValues/" + USR_VIN + "?format=json",
	  type: "GET",
	  dataType: "JSON",
	  success: function(result)
	  {
		  //console.log(result);


      //The following code retrieves the corosponding value stored in the api's array.
      //Then there is a check to see if anything was retrieved.
      //If something was recieved then the page will update with recieved value.
      //If not then the page will update with "No Data" 

      //------------retrieve the vehicle model info------------------------
      MODEL = result.Results[0].Model;  //console.log("model: "+MODEL); 
      if(MODEL.length > 1 ){
        model_text.innerHTML = MODEL;
      }else{
        model_text.innerHTML = "No Data";
      }

      //------------retrieve the vehicle model year info------------------------
      MODEL_YEAR = result.Results[0].ModelYear ;  //console.log("year: "+MODEL_YEAR); 
      if(MODEL_YEAR.length > 1 ){
        model_year_text.innerHTML = MODEL_YEAR;
      }else{
        model_year_text.innerHTML = "No Data";
      }

      //------------retrieve the vehicle make info------------------------
      MAKE = result.Results[0].Make;  //console.log("make: "+MAKE); 
      if(MAKE.length > 1 ){
        make_text.innerHTML = MAKE;
      }else{
        make_text.innerHTML = "No Data";
      }

      //------------retrieve the vehicle drive type info------------------------
      DRIVE_TYPE = result.Results[0].DriveType;  //console.log("drive type: "+DRIVE_TYPE); 
      if (DRIVE_TYPE.length > 1 ){
        drive_type_text.innerHTML = DRIVE_TYPE;
      }else {
        drive_type_text.innerHTML = "No Data"
      }

      //------------retrieve the vehicle fuel type info------------------------
      FUEL_TYPE = result.Results[0].FuelTypePrimary;  //console.log("fuel type: "+FUEL_TYPE); 
      if(FUEL_TYPE.length > 1 ){
        fuel_type_text.innerHTML = FUEL_TYPE;
      }else{
        fuel_type_text.innerHTML = "No Data";
      }

      //------------retrieve the vehicle engine cylinders info------------------------
      ENGINE_CYLINDERS = result.Results[0].EngineCylinders;  //console.log("engine cylinders: "+ENGINE_CYLINDERS); 
      if(ENGINE_CYLINDERS.length > 1 ){
        cylinders_text.innerHTML = ENGINE_CYLINDERS;
      }else{
        cylinders_text.innerHTML = "No Data";
      }

      //------------retrieve the vehicle horsepower info------------------------
      ENGINE_HP = result.Results[0].EngineHP;  //console.log("horsepower: "+ENGINE_HP); 
      if(ENGINE_HP.length > 1 ){
        engine_hp_text.innerHTML = ENGINE_HP;
      }else{
        engine_hp_text.innerHTML = "No Data";
      }

      //------------retrieve the vehicle seats info------------------------
      SEATS = result.Results[0].Seats;  //console.log("seats: "+SEATS); 
      if(SEATS.length > 0 ){
        seats_text.innerHTML =  SEATS;
      }else{
        seats_text.innerHTML = "No Data";
      }

      //------------retrieve the vehicle rows info------------------------
      SEAT_ROWS = result.Results[0].SeatRows;  //console.log("seat rows: "+SEAT_ROWS); 
      if(SEAT_ROWS.length > 0 ){
        rows_text.innerHTML = SEAT_ROWS;
      }else{
        rows_text.innerHTML = "No Data";
      }

      //------------retrieve the vehicle top speed info------------------------
      TOP_SPEED = result.Results[0].TopSpeedMPH;  //console.log("top speed: "+TOP_SPEED + "mph"); 
     if(TOP_SPEED.length > 1 ){
        top_speed_text.innerHTML = TOP_SPEED;
      }else{
        top_speed_text.innerHTML = "No Data";
      }

      //------------retrieve the vehicle type info------------------------
      VEHICLE_TYPE = result.Results[0].VehicleType; //console.log("vehicle type: "+VEHICLE_TYPE); 
      if(VEHICLE_TYPE.length > 1 ){
        vehicle_type_text.innerHTML = VEHICLE_TYPE;
      }else{
        vehicle_type_text.innerHTML = "No Data";
      }

      //------------retrieve any error code values related to the VIN provided------------------------
      ERROR_CODE = result.Results[0].ErrorCode;  //console.log("error codes: "+ERROR_CODE); 
      if(ERROR_CODE.length > 1 ){
        error_code_number.innerHTML = ERROR_CODE;
      }else{
        error_code_number.innerHTML = "No Data";
      }
      
      //------------retrieve the text for the corosponding error codes related to the VIN provided------------------------
      ERROR_TEXT = result.Results[0].ErrorText;  //console.log("error text: "+ERROR_TEXT); 
      if(ERROR_TEXT.length > 1 ){
        error_code_text.innerHTML = ERROR_TEXT;
      }else{
        error_code_text.innerHTML = "No Data";
      }

      vehicle_type_h1.innerHTML = MAKE +" "+ MODEL;

      //The next block of code is used to make sure that vehicle info is only displayed if the user input a valid VIN
      //if the VIN is not valid then the error section will display.
      user_vin_text.innerHTML = localStorage.getItem("USR_VIN");
      if (ERROR_CODE == 0){
        //console.log("no errors");
        document.getElementById("info").style.display = "inline";
        document.getElementById("vehicle-image").style.display = "inline";
      }else{
        //console.log("error code")
        document.getElementById("errors").style.display = "inline";  
      }
      

      //the folowing block of code is used to retrieve an image of the same vechicle type as the provide VIN
      $.ajax({
        url:"https://salty-mountain-68764.herokuapp.com/https://imsea.herokuapp.com/api/1?q="+ MODEL_YEAR + " " + MAKE + " "+ MODEL,
        type: "GET",
	      dataType: "JSON",
        success: function(result)
	        {
          //console.log(result.results[1])
          //set the url for the image as the image in the box.
          document.getElementById("vehicle-image").src = result.results[1];
          },
        error: function(xhr, ajaxOptions, thrownError){ 
          console.log(xhr.status); 
          console.log(thrownError);}
      });
  },
	error: function(xhr, ajaxOptions, thrownError){ 
    console.log(xhr.status); 
    console.log(thrownError);}
  }); 
});


