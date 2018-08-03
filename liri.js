
require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var client = new twitter(keys.twitter);
var fs = require("fs");

var nodeArgv = process.argv;
var command = process.argv[2];
var inputs = nodeArgv[3];
//movie or song
var x = "";
//attaches multiple word arguments
for (var i=3; i<nodeArgv.length; i++){
  if(i>3 && i<nodeArgv.length){
    x = x + "+" + nodeArgv[i];
  } else{
    x = x + nodeArgv[i];
  }
}

switch(command){
      case "my-tweets":
        twitter(inputs);
      break;
    
      case "spotify-this-song":
        if(x){
          spotifySong(x);
        } else{
          spotifySong("The Sign, ace of base");
        }
      break;
    
      case "movie-this":
        if(x){
          omdbData(x)
        } else{
          omdbData("Mr. Nobody")
        }
      break;
    
      case "do-what-it-says":
        doThing();
      break;
    
      default:
        console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
      break;
    }

    function twitter(inputs) {
	    var params = {screen_name: inputs, count: 20};
	
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
          if (!error) {
            for (i = 0; i < tweets.length; i ++){
              console.log("Tweet: " + "'" + tweets[i].text + "'" + " Created At: " + tweets[i].created_at);
              console.log(response);
            
            //adds text to log.txt file
            fs.appendFile('log.txt', "@at65828084: " + tweets[i].text + " Created At: " + date.substring(0, 19));
            fs.appendFile('log.txt', "-----------------------");
          }
        }else{
          console.log('Error occurred');
        }
      });
    }


    function spotifySong(song){
        spotify.search({ type: "track", query: song}, function(error, data){
          if(!error){
            for(var i = 0; i < data.tracks.items.length; i++){
              var songData = data.tracks.items[i];
              //artist
              console.log("Artist: " + songData.artists[0].name);
              //song name
              console.log("Song: " + songData.name);
              //spotify preview link
              console.log("Preview URL: " + songData.preview_url);
              //album name
              console.log("Album: " + songData.album.name);
    
              //adds text to log.txt
              fs.appendFileSync("log.txt", songData.artists[0].name);
              fs.appendFileSync("log.txt", songData.name);
              fs.appendFileSync("log.txt", songData.preview_url);
              fs.appendFileSync("log.txt", songData.album.name);
            
            }
        //   } else{
        //     console.log("Error occurred.");
          }
        });
      }
      
      function omdbData(movie){
        var omdbURL = "https://www.omdbapi.com/?t="
        + movie +
        "&y=&plot=short&tomatoes&apikey=trilogy";
      
        request(omdbURL, function (error, response, body){
          if(!error && response.statusCode == 200){
            var body = JSON.parse(body);
      
            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMdB Rating: " + body.imdbRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value);
      
            //adds text to log.txt
            fs.appendFileSync("log.txt", "Title: " + body.Title);
            fs.appendFileSync("log.txt", "Release Year: " + body.Year);
            fs.appendFileSync("log.txt", "IMdB Rating: " + body.imdbRating);
            fs.appendFileSync("log.txt", "Country: " + body.Country);
            fs.appendFileSync("log.txt", "Language: " + body.Language);
            fs.appendFileSync("log.txt", "Plot: " + body.Plot);
            fs.appendFileSync("log.txt", "Actors: " + body.Actors);
            fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + body.Ratings[1].Value);
            
      
          } else{
            console.log("Error occurred.")
          }
          if(movie === "Mr. Nobody"){
            console.log("-----------------------");
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");
      
            //adds text to log.txt
            fs.appendFileSync("log.txt", "-----------------------");
            fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            fs.appendFileSync("log.txt", "It's on Netflix!");
          }
        });
      
      }
      
      function doThing(){
        fs.readFile("random.txt", "utf8", function(error, data){
          var txt = data.split(",");
      
          spotifySong(txt[1]);
        });
      }