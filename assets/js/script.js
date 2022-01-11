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


document.querySelector("#submit").addEventListener("click", function(event){
  event.preventDefault();
  USR_VIN = document.getElementById("VIN").value;
  $.ajax({
	  url: "https://vpic.nhtsa.dot.gov/api//vehicles/DecodeVinValues/" + USR_VIN + "?format=json",
	  type: "GET",
	  dataType: "JSON",
	  success: function(result)
	  {
		  console.log(result);
      //change console.log to getElementById("....").value = ......

      MODEL = result.Results[0].Model;  console.log("model: "+MODEL);
      MODEL_YEAR = result.Results[0].ModelYear ;  console.log("year: "+MODEL_YEAR);
      MAKE = result.Results[0].Make;  console.log("make: "+MAKE);
      DRIVE_TYPE = result.Results[0].DriveType;  console.log("drive type: "+DRIVE_TYPE);
      FUEL_TYPE = result.Results[0].FuelTypePrimary;  console.log("fuel type: "+FUEL_TYPE);
      ERROR_CODE = result.Results[0].ErrorCode;  console.log("error codes: "+ERROR_CODE);
      ERROR_TEXT = result.Results[0].ErrorText;  console.log("error text: "+ERROR_TEXT);
      ENGINE_CYLINDERS = result.Results[0].EngineCylinders;  console.log("engine cylinders: "+ENGINE_CYLINDERS);
      ENGINE_HP = result.Results[0].EngineHP;  console.log("horsepower: "+ENGINE_HP);
      SEATS = result.Results[0].Seats;  console.log("seats: "+SEATS);
      SEAT_ROWS = result.Results[0].SeatRows;  console.log("seat rows: "+SEAT_ROWS);
      TOP_SPEED = result.Results[0].TopSpeedMPH;  console.log("top speed: "+TOP_SPEED);
      VEHICLE_TYPE = result.Results[0].VehicleType; console.log("vehicle type: "+VEHICLE_TYPE);
      
      
      $.ajax({
        url:"https://imsea.herokuapp.com/api/1?q="+ MAKE + " "+ MODEL,
        type: "GET",
	      dataType: "JSON",
        success: function(result)
	        {
          console.log(result)
          
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
});


