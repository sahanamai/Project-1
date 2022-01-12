var MODEL = "";  //returns the model type --- result.Model
var MODEL_YEAR = ""; //returns the model year --- result.ModelYear
var MAKE = ""; //returns the manufacturer --- result.Make
var USR_VIN = ""; //user input for vin number.  --- 1C4PJLCB5HW650865
var DRIVE_TYPE = ""; //returns the Drive type for the vehicle ex. 4WD or AWD --- result.DriveType
var FUEL_TYPE = ""; //returns the fuel type for the vehicle. --- result.FuelTypePrimary
var ERROR_CODE = ""; //returns any error codes found for the VIN --- result.ErrorCode
var ERROR_TEXT = ""; //returns any error codes in text form for the VIN --- result.ErrorText
var ENGINE_CYLINDERS = ""; //returns how many cylinders the engine has. --- result.EngineCylinders
var ENGINE_HP = ""; //returns how many Horse power the Engine has. --- result.EngineHP
var SEATS = ""; //returns how many seats the vehicle has. --- result.Seats
var SEAT_ROWS = ""; //returns how many rows the vehicle has --- result.SeatRows
var TOP_SPEED = ""; //returns the top speed for the vehicle. --- result.TopSpeedMPH
var VEHICLE_TYPE = ""; //returns the vehicle type --- result.VehicleType

var model_text        = document.getElementById("model");
var model_year_text   = document.getElementById("model-year");
var make_text         = document.getElementById("make");
var user_vin_text     = document.getElementById("user-vin");
var drive_type_text   = document.getElementById("drive-type");
var fuel_type_text    = document.getElementById("fuel type"); /// might have to change this to be a single word
var error_code_number = document.getElementById("error-code");
var error_code_text   = document.getElementById("error-text");
var cylinders_text    = document.getElementById("cylinder");
var engine_hp_text    = document.getElementById("engine-hp");
var seats_text        = document.getElementById("seats");
var rows_text         = document.getElementById("rows");
var top_speed_text    = document.getElementById("top-speed");
var vehicle_type_text = document.getElementById("vehicle-type");

document.querySelector("#submit").addEventListener("click", function(event){
  event.preventDefault();
  USR_VIN = document.getElementById("input").value;
  $.ajax({
	  url: "https://vpic.nhtsa.dot.gov/api//vehicles/DecodeVinValues/" + USR_VIN + "?format=json",
	  type: "GET",
	  dataType: "JSON",
	  success: function(result)
	  {
		  console.log(result);
      //change console.log to getElementById("....").value = ......

      MODEL = result.Results[0].Model;  console.log("model: "+MODEL); model_text.innerHTML = MODEL;
      MODEL_YEAR = result.Results[0].ModelYear ;  console.log("year: "+MODEL_YEAR); model_year_text.innerHTML = MODEL_YEAR;
      MAKE = result.Results[0].Make;  console.log("make: "+MAKE); make_text.innerHTML = MAKE;
      DRIVE_TYPE = result.Results[0].DriveType;  console.log("drive type: "+DRIVE_TYPE); drive_type_text.innerHTML = DRIVE_TYPE;
      FUEL_TYPE = result.Results[0].FuelTypePrimary;  console.log("fuel type: "+FUEL_TYPE); fuel_type_text.innerHTML = FUEL_TYPE;
      ERROR_CODE = result.Results[0].ErrorCode;  console.log("error codes: "+ERROR_CODE); error_code_number.innerHTML = ERROR_CODE;
      ERROR_TEXT = result.Results[0].ErrorText;  console.log("error text: "+ERROR_TEXT); error_code_text.innerHTML = ERROR_TEXT;
      ENGINE_CYLINDERS = result.Results[0].EngineCylinders;  console.log("engine cylinders: "+ENGINE_CYLINDERS); cylinders_text.innerHTML = ENGINE_CYLINDERS;
      ENGINE_HP = result.Results[0].EngineHP;  console.log("horsepower: "+ENGINE_HP); engine_hp_text.innerHTML = ENGINE_HP;
      SEATS = result.Results[0].Seats;  console.log("seats: "+SEATS); seats_text.innerHTML =  SEATS;
      SEAT_ROWS = result.Results[0].SeatRows;  console.log("seat rows: "+SEAT_ROWS); rows_text.innerHTML = SEAT_ROWS;
      TOP_SPEED = result.Results[0].TopSpeedMPH;  console.log("top speed: "+TOP_SPEED); top_speed_text.innerHTML = TOP_SPEED;
      VEHICLE_TYPE = result.Results[0].VehicleType; console.log("vehicle type: "+VEHICLE_TYPE); vehicle_type_text.innerHTML = VEHICLE_TYPE;
      
      
      $.ajax({
        url:"https://salty-mountain-68764.herokuapp.com/https://imsea.herokuapp.com/api/1?q="+ MAKE + " "+ MODEL,
        type: "GET",
	      dataType: "JSON",
        success: function(result)
	        {
          console.log(result.results[1])
          document.getElementById("vehicle-image").src = result.results[1];
          
          //set the url for the image as the image in the box.
          },
        error: function(xhr, ajaxOptions, thrownError)
	        {
		      console.log(xhr.status);
		      console.log(thrownError);
	        }
      });
  },

	error: function(xhr, ajaxOptions, thrownError)
	{
		console.log(xhr.status);
		console.log(thrownError);
	}
  
 

  });
  document.getElementById("input").innerHTML =JSON.parse(localStorage.getItem("USR_VIN"));
  console.log(JSON.parse(localStorage.getItem("USR_VIN")));//get item from local storage

});


