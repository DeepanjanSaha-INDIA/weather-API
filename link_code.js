const electron = require('electron');
let {PythonShell} = require('python-shell');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;

// function get_data() {


//     // let options = {
//     //     scriptPath : '__dirname',
//     //     args =  [city, country]
//     // };

//     // let weather = new python('weather_api_code.py', ontions);

//     // weather.on('message', (message) => {
//     //     swal(message);
//     // });
// }



function send_data(status) {
  var country = "Unknown"
  if (status == 'city'){
    let city = document.getElementById("city").value;
    var country = document.getElementById("city_country").value;
    var options = {
      scriptPath: __dirname,
      args: [status,city,country]
    };
    document.getElementById("city").value = "";
    document.getElementById("city_country").value = "India";
    // document.getElementById('result').innerHTML = options.args;
  }
  
  if (status == 'pincode'){
    let pincode = document.getElementById("pincode").value;
    var country = document.getElementById("pincode_country").value;
    var options = {
      scriptPath: __dirname,
      args: [status,pincode,country]
    };
    document.getElementById("pincode").value = "";
    document.getElementById("pincode_country").value = "India";
    // document.getElementById('result').innerHTML = options.args;
  }

  if (status == 'coordinates'){
    let latitude = document.getElementById("latitude").value;
    let longitude = document.getElementById("longitude").value;
    var options = {
      scriptPath: __dirname,
      args: [status,latitude,longitude]
    };
    document.getElementById("latitude").value = "";
    document.getElementById("longitude").value = "";
    // document.getElementById('result').innerHTML = options.args;
  }

  PythonShell.run('weather_api_code.py', options, function (err, results) {
    if (err) throw err;
    var data = JSON.parse(results[0]);
    data["country"]=country;
    if (data["name"]==""){
      data["name"]="Unknown"
    }
    res = JSON.stringify(data,null,4);
    if (data["cod"]==200){
      document.getElementById("result").innerHTML = "Name: " + data["name"] + "\n" +
      "Country: " + country + "\n" +
      "Coordinate (Latitude): " + data["coord"]["lat"] + "\n" +
      "Coordinate (Longitude): " + data["coord"]["lon"] + "\n" +
      "Humidity: " + data["main"]["humidity"] + "\n" +
      "Pressure: " + data["main"]["pressure"] + "\n" +
      "Temperature: " + (data["main"]["temp"]-273.15).toFixed(2) + "\n" +
      "Weather: " + data["weather"][0]["description"] + "\n" +
      "Wind (speed): " + data["wind"]["speed"] + " Kmph" + "\n" +
      "Wind (direction): " + data["wind"]["deg"] + " degree";
    } else{
      document.getElementById("result").innerHTML = res;
    }
  });
}

