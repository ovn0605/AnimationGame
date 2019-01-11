
let myrow=1;
let count=1;
let Xtile=0; //Player's current column
let Ytile=0; //player's current row
let runtimeMintues=0;
let runTimeSeconds=0;
let numfailures=0;
playground=document.getElementById("playground");
for (let i=0; i<6; i++){
	let frameclass="frame";
	if (i==0)
		frameclass=frameclass + " waterframe";
	else if (i<4)
		frameclass=frameclass + " pavementframe";
	else
		frameclass=frameclass + " grassframe";

	let div=document.createElement('div');
    div.setAttribute("class","row");/* create the row elements for using bootstrap*/

   for (let j=0;j<6;j++){
   	   let div1=document.createElement('div');
    	div1.setAttribute("class","col-xs-2"); /*using the bootstrap col-xs-2 class*/
    	frame=document.createElement("div");
    	frame.setAttribute("class",frameclass);
      frame.setAttribute("id",`${i*6+j}`)
    	div1.appendChild(frame);
    	div.appendChild(div1);
       }
  playground.appendChild(div);
}

//This function displays a timer that is updated every second.
function displayTime(){
  let seconds=0;
  let minutes=0;
  let stringSecond="";
  let stringMinute="";
  let myTimer=document.getElementById("mytimer");
  myTimer.innerHTML=`Timer: 00:00`;
  return function(){
     seconds=seconds+1;
  
  if (seconds>=60){
    seconds=seconds-60;
    minutes=minutes+1;
    //Time is reset after 1 hr
    if (minutes>60){
        minutes=0
      } }
      if (seconds<10)
          stringSecond="0"+seconds;
      else
         stringSecond=""+seconds;
     if (minutes<10)
        stringMinute="0"+minutes;
      else
        stringMinute=""+minutes;
      myTimer.innerHTML=`Timer: ${stringMinute}:${stringSecond}`;
      runTimeMinutes=minutes;
      runTimeSeconds=seconds;
    
}

}

function GenerateBugs(){
  //The constructor takes 3 parameters xposn, yposn and speed 
  //xposn and yposn are the relative initial position of each bug within its frame (consquently its row) 
  //speed is a random integer between and 10
let myspeed=Math.ceil(10*Math.random());
B1=new Bug("images/bug.png",-50,0,myspeed);
let myrow=Math.ceil(3*Math.random());
B1.displayInitial(myrow);
 //myrow=(myrow % 3) +1;
 count++;
  /*if (count>=15)
    clearInterval(IntId1);*/
}

function Reset(){
   P1.Reset(4,2);
   clearInterval(runTimer);
   Timer=displayTime();
   runTimer=setInterval(Timer,1000);
   numfailures=0;
   let failElem=document.getElementById("failurescount");
   failElem.innerHTML=numfailures;
}

P1= new Player("images/player.png",-30,10);
let elem=P1.createElement();
P1.displayInitial(elem,4,2);
let IntId1=setInterval(GenerateBugs,800);
Timer=displayTime();
runTimer=setInterval(Timer,1000);