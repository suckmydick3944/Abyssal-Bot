var pokemen={};
		try {
			pokemen = DataDownloader.getPokedex();
		} catch (e) {
			return this.pmReply('Error importing pokedex.js');
		}
var cm;
        try {
            cm = DataDownloader.getMoves();
        } catch (e) {
            return this.pmReply('Error importing moves.js');
        }
var rebuild = function(zom)
{
    var k="";
		for(var i=0;i<zom.length;i++)
		{
			if(zom.charAt(i)===' '||zom.charAt(i)==='-'||zom.charAt(i)==='.'||zom.charAt(i)==='/'||zom.charAt(i)==='+')
				continue;
			else
				k=k+zom.charAt(i);
		}
		return k.toLowerCase();
}
var isMega = function(zom)
 {
 	var k="",b=false;
 	zom = rebuild(zom);
 	for(var i=0;i<k.length;i++)
 	{
 		
 		if(k.charAt(i)=='m'&&k.charAt(i+1)=='e'&&k.charAt(i+2)=='g'&&k.charAt(i+3)=='a')
 			b=true;
 	}
 	if(k=="yanmega")
 		b=false;
 	if(k.charAt(0)=='m')
	 	if(pokemen[k.substring(1,k.length)+"mega"]!=undefined)
	 		b=true;
 	return b;
}
var natures = {
		adamant: {name:"Adamant", swap:true, plus:'atk', minus:'spa'},
		bashful: {name:"Bashful", swap:false, },
		bold: {name:"Bold", swap:true, plus:'def', minus:'atk'},
		brave: {name:"Brave", swap:true, plus:'atk', minus:'spe'},
		calm: {name:"Calm", swap:true, plus:'spd', minus:'atk'},
		careful: {name:"Careful", swap:true, plus:'spd', minus:'spa'},
		docile: {name:"Docile", swap:false},
		gentle: {name:"Gentle", swap:true, plus:'spd', minus:'def'},
		hardy: {name:"Hardy" , swap:false},
		hasty: {name:"Hasty", swap:true, plus:'spe', minus:'def'},
		impish: {name:"Impish", swap:true, plus:'def', minus:'spa'},
		jolly: {name:"Jolly", swap:true, plus:'spe', minus:'spa'},
		lax: {name:"Lax", swap:true, plus:'def', minus:'spd'},
		lonely: {name:"Lonely", swap:true, plus:'atk', minus:'def'},
		mild: {name:"Mild", swap:true, plus:'spa', minus:'def'},
		modest: {name:"Modest", swap:true, plus:'spa', minus:'atk'},
		naive: {name:"Naive", swap:true, plus:'spe', minus:'spd'},
		naughty: {name:"Naughty", swap:true, plus:'atk', minus:'spd'},
		quiet: {name:"Quiet", swap:true, plus:'spa', minus:'spe'},
		quirky: {name:"Quirky", swap:false},
		rash: {name:"Rash", swap:true, plus:'spa', minus:'spd'},
		relaxed: {name:"Relaxed", swap:true, plus:'def', minus:'spe'},
		sassy: {name:"Sassy", swap:true, plus:'spd', minus:'spe'},
		serious: {name:"Serious", swap:false},
		timid: {name:"Timid", swap:true, plus:'spe', minus:'atk'},
	};
exports.commands = {
	ns: 'natureswap',
	'natureswap' : function(arg,by,room)
	{
		var text="";
		if(arg==" " || arg=='')
		{
			text+="Usage: ``ns <Nature> <Pokemon>``";
		}
		else
		{
		var tar = arg.split(' ');
		var poke=tar[1],nat=rebuild(tar[0]),p=rebuild(poke);
		if(p=="mega")
			poke=tar[2]+"mega";
		if(p.charAt(0)=="m" && pokemen[p.substring(1,p.length)+"mega"]!=undefined)
			poke=poke.substring(1,poke.length)+"mega";
		var temp="";
		p=rebuild(poke);
		if(pokemen[p]==undefined)
		{
			text+="Error: Pokemon not found";
		}
		else if(natures[nat]==undefined)
		{
			text+="Error: Nature not found";
		}
		else
		{
			/*var pokeobj = pokemen[rebuild(poke)];
			var natureobj = pokeobj[natures[nat]];
			if(natures[nat]['swap'])
			{
				temp = natureobj['plus'];
				pokeobj[natureobj['plus']] = natureobj['minus'];
				pokeobj[natureobj['minus']] = temp;
			}*/
			var pokeobj = {
				hp:""+pokemen[p].baseStats.hp,
				atk:""+pokemen[p].baseStats.atk,
				def:""+pokemen[p].baseStats.def,
				spa:""+pokemen[p].baseStats.spa,
				spd:""+pokemen[p].baseStats.spd,
				spe:""+pokemen[p].baseStats.spe,
				name:pokemen[p].species,
			};
			var natureobj = natures[nat];
			if(natureobj['swap'])
			{
				temp = "**"+pokeobj[natureobj['plus']]+"**";
				pokeobj[natureobj['plus']] = "**"+pokeobj[natureobj['minus']]+"**";
				pokeobj[natureobj['minus']] = temp;
			}
			text+="The new stats for "+pokeobj['name']+" are: "+pokeobj['hp']+"/"+pokeobj['atk']+"/"+pokeobj['def']+"/"+pokeobj['spa']+"/"+pokeobj['spd']+"/"+pokeobj['spe']+"";
		}
	}
		this.say(room,text);
	},
	'gt': function(arg,by,room)
    {
        var text="";
        if(arg=="" || arg == " ")
            text+="Usage: ``gt <move>`` Returns the contest type of the move.";
        else if(cm[rebuild(arg)]==undefined)
            text+="Error: Move not found";
        else
        {
            text+="The Contest Type for \""+arg+"\" is "+cm[rebuild(arg)].contestType;
        
        var dype = "",gon=cm[rebuild(arg)].contestType.toLowerCase();
        if(gon=="cool")
            dype=" (Attack)";
        if(gon=="beautiful")
            dype=" (Special Attack)";
        if(gon=="cute")
            dype=" (Speed)";
        if(gon=="clever")
            dype=" (Special Defense)";
        if(gon=="tough")
            dype=" (Defense)";
        text+=dype;
    }
        this.say(room,text);
    },
    bulbapedia:'bulba',
    'bulba':function(arg,by,room)
    {
        var text='';
        if(arg==' '||arg == '')
            text+="Usage: ``bulba <pokemon name>``"
        else if(pokemen[arg.trim().toLowerCase()]==undefined)
            text+="Error: Pokemon not found";
        else
            text+="http://bulbapedia.bulbagarden.net/wiki/"+arg+"_(Pok%C3%A9mon)";
        this.restrictReply(text);
    },
    'randmonoteam':function(arg,by,room)
    {
    	var types=["Fire","Ice","Rock","Grass","Fairy","Steel","Water","Normal","Fighting","Poison","Flying","Bug","Ground","Ghost","Dark","Dragon","Psychic","Electric","???"];
	    var rando  = Math.floor(Math.random() * 18);
	    this.say(room,"!randpoke 6,"+types[rando]+" type");
    },
    'coin' : function(arg, by, room)
    {
         var rand = Math.random();
         var text = this.hasRank(by, '+%@#&~') || room.charAt(0) === ',' ? '' : '/pm ' + by + ', ';

         if(rand>0.0 && rand <= 0.5)
              text+='Heads';
         else
            text+='Tails';
         this.say(room,text);
    },
    awayfromkeyboard:'afk',
    afk : function(arg,by,room)
    {
			if(by.charAt(0)=='+' || by.charAt(0)=='%' || by.charAt(0)=='@' || by.charAt(0)=='#' || by.charAt(0)=='&' || by.charAt(0)=='~' || by.toLowerCase()==" spandan")
			{
				if(by.charAt(0)=='+' || by.charAt(0)=='%' || by.charAt(0)=='@' || by.charAt(0)=='#' || by.charAt(0)=='&' || by.charAt(0)=='~' );
        {
        var text="",b="";
        if(by.charAt(0)=='+' || by.charAt(0)=='%' || by.charAt(0)=='@' || by.charAt(0)=='#' || by.charAt(0)=='&' || by.charAt(0)=='~' || by.charAt(0)==' ')
        {
            for(var i=1;i<by.length;i++)
            b+=by.charAt(i);
        }
        else
        {
            b=by;
        }
        if(arg==="")
        text="Usage: .busy <reason> or .dnd <reason>";
        else if(arg.toLowerCase()==="no longer busy" || arg.toLowerCase()==="back" )
        text="__"+b+"__ is no longer AFK.";
        else
        text="__"+b+"__ is now away from the keyboard, Reason: ``"+arg+"``";
        this.say(room,text);
			}
    }
    },
    'contribute':function()
    {
        this.restrictReply('Teams for me can be added only by global authorities. If you want to contribute teams for me, PM a hastebin link of the team to a global voice or above and also mention the format. Contributing teams for me is highly appreciated.');
    },
    dnd:'busy',
    busy : function(arg,by,room)
    {
        var text="",b="";
        if(by.charAt(0)=='+' || by.charAt(0)=='%' || by.charAt(0)=='@' || by.charAt(0)=='#' || by.charAt(0)=='&' || by.charAt(0)=='~' || by.charAt(0)==' ')
        {
            for(var i=1;i<by.length;i++)
            b+=by.charAt(i);
        }
        else
        {
            b=by;
        }
        if(arg==="")
        text="Usage: .busy <reason> or .dnd <reason>";
        else if(arg.toLowerCase()==="no longer busy" || arg.toLowerCase()==="back" || arg.toLowerCase()==="not busy")
        text="__"+b+"__ is no longer busy.";
        else
        text="__"+b+"__ is now busy, Reason: ``"+arg+"``";
        this.say(room,text);
    },
	'randtype':function(arg,by,room)
	{
	    var text = this.hasRank(by, '+%@#&~') || room.charAt(0) === ',' ? '' : '/pm ' + by + ', ';
	    var types=["Fire","Ice","Rock","Grass","Fairy","Steel","Water","Normal","Fighting","Poison","Flying","Bug","Ground","Ghost","Dark","Dragon","Psychic","Electric","???"];
	    var rando  = Math.floor(Math.random() * 18);
	    text=types[rando];
	    this.say(room,text);
	},

	roulette:'range',
	range:function(arg,by,room)
	{
	    var baba=false;
	    if(arg!="")
	    {
	    var choices = arg.split(",");
	    var rando=0;
	    var limit1 = parseInt(choices[0]);
	    var limit2 = parseInt(choices[1]);
	    var text="Please enter a number as argument.";
	    if(choices.length>2)
	    {
	        this.say(room,"Sorry, you have to enter **two numbers only** as an argument.");
	        baba=true;
	    }
	    if(choices.length===2)
	    {
	    if(limit1>limit2)
	    rando  = Math.floor(Math.random() * ((limit1)-(limit2-1)))+limit2;
	    else if(limit2>limit1)
	    rando  = Math.floor(Math.random() * ((limit2)-(limit1-1)))+limit1;
	    else
	    rando=limit1;
	    }
	    else if(choices.length===1)
	    {
	       var rando  = Math.floor(Math.random() * parseInt(choices[0]));
	    }
	    if(!isNaN(rando) && !baba)
	    this.say(room,""+rando);
	    else if(isNaN(rando))
	    this.say(room,text);
	    }
	    else
	    this.say(room,"**Usage**: .roulette/.range <lower limit>,<upper limit>")
	},
	'hp':function(arg,by,room)
    {
    	var ivs = arg.split("/");
    	var b = true;
    	for(var i=0;i<5;i++)
    	{
    		if(ivs[i]>31||ivs[i]<0||ivs.length!=6)
    		{
    			b=false;
    			break;
    		}
    	}
    	if(b)
    	{
	    	var types = ['Fighting','Flying','Poison','Ground','Rock','Bug','Ghost','Steel','Fire','Water','Grass','Electric','Psychic','Ice','Dragon','Dark'];
	    	var getBit = function(val)
	    	{
	    		if(val%2!=0)
	    			return 1;
	    		else
	    			return 0;
	    	}
	    	var value = Math.floor(((getBit(ivs[0])+(2*getBit(ivs[1]))+(4*getBit(ivs[2]))+(8*getBit(ivs[3]))+(16*getBit(ivs[4]))+(32*getBit(ivs[5])))*15)/63);
	    	this.say(room,"the Hidden Power for the following spread is: "+types[value]);
	    }
	    else
	    {
	    	this.say(room,"Error: IVs can't be less than 0, more than 31")
	    }
    },
	mixandmega:'mnm',
	mnm:function(arg,by,room)
	{
		var text="";//var text = this.hasRank(by, '+%@#&~') || room.charAt(0) === ',' ? '' : '/pm ' + by + ', ';
		var stones = {
							abomasite:{
								atk:40,def:30,spa:40,spd:20,spe:-30,ability:'Snow Warning',type:'None',wt:49.5
							},
							absolite:{
								atk:20,def:0,spa:40,spd:0,spe:40,ability:'Magic Bounce',type:'None',wt:2
							},
							aerodactylite:{
								atk:30,def:20,spa:10,spd:20,spe:20,ability:'Tough Claws',type:'None',wt:20
							},
							aggronite:{
								atk:30,def:50,spa:0,spd:20,spe:20,ability:'Filter',type:'Steel',wt:35
							},
							alakazite:{
								atk:0,def:20,spa:40,spd:0,spe:30,ability:'Trace',type:'None',wt:0
							},
							altarianite:{
								atk:40,def:20,spa:40,spd:0,spe:0,ability:'Pixilate',type:'Fairy',wt:0
							},
							ampharosite:{
								atk:20,def:20,spa:50,spd:20,spe:-10,ability:'Mold Breaker',type:'Dragon',wt:0
							},
							audinite:{
								atk:0,def:40,spa:20,spd:40,spe:0,ability:'Healer',type:'Fairy',wt:1
							},
							banettite:{
								atk:50,def:10,spa:10,spd:20,spe:10,ability:'Prankster',type:'None',wt:0.5
							},
							blastoisinite:{
								atk:20,def:20,spa:50,spd:10,spe:0,ability:'Mega Launcher',type:'None',wt:15.6
							},
							cameruptite:{
								atk:20,def:30,spa:40,spd:30,spe:-20,ability:'Sheer Force',type:'None',wt:100.5
							},
							'charizardite x':{
								atk:46,def:33,spa:21,spd:0,spe:0,ability:'Tough Claws',type:'Dragon',wt:20
							},
							'charizardite y':{
								atk:20,def:0,spa:50,spd:30,spe:0,ability:'Drought',type:'None',wt:10
							},
							diancite:{
								atk:60,def:-40,spa:60,spd:-40,spe:60,ability:'Magic Bounce',type:'None',wt:19
							},
							galladite:{
								atk:40,def:30,spa:0,spd:0,spe:30,ability:'Inner Focus',type:'None',wt:4.4
							},
							garchompite:{
								atk:40,def:20,spa:40,spd:10,spe:-10,ability:'Sand Force',type:'None',wt:0
							},
							gardevoirite:{
								atk:20,def:00,spa:40,spd:20,spe:20,ability:'Pixilate',type:'None',wt:0
							},
							gengarite:{
								atk:0,def:20,spa:40,spd:20,spe:20,ability:'Shadow Tag',type:'None',wt:0
							},
							glalitite:{
								atk:40,def:0,spa:40,spd:0,spe:20,ability:'Refrigerate',type:'None',wt:93.7
							},
							gyaradosite:{
								atk:30,def:30,spa:10,spd:30,spe:0,ability:'Mold Breaker',type:'Dark',wt:70
							},
							heracronite:{
								atk:60,def:40,spa:0,spd:10,spe:-10,ability:'Skill Link',type:'None',wt:8.5
							},
							houndoominite:{
								atk:0,def:40,spa:30,spd:10,spe:20,ability:'Solar Power',type:'None',wt:14.5
							},
							latiasite:{
								atk:20,def:30,spa:30,spd:20,spe:0,ability:'Levitate',type:'None',wt:12
							},
							latiosite:{
								atk:40,def:20,spa:30,spd:10,spe:0,ability:'Levitate',type:'None',wt:10
							},
							loppunite:{
								atk:60,def:10,spa:0,spd:0,spe:30,ability:'Scrappy',type:'Fighting',wt:5
							},
							lucarionite:{
								atk:35,def:18,spa:25,spd:0,spe:22,ability:'Adaptability',type:'None',wt:3.5
							},
							manectite:{
								atk:0,def:20,spa:30,spd:20,spe:30,ability:'Intimidate',type:'None',wt:3.8
							},
							metagrossite:{
								atk:10,def:20,spa:10,spd:20,spe:40,ability:'Tough Claws',type:'None',wt:392.9
							},
							'mewtwonite x':{
								atk:80,def:10,spa:0,spd:10,spe:0,ability:'Steadfast',type:'Fighting',wt:5
							},
							'mewtwonite y':{
								atk:40,def:-20,spa:40,spd:30,spe:10,ability:'Insomnia',type:'None',wt:89
							},
							pidgeotite:{
								atk:0,def:5,spa:65,spd:10,spe:20,ability:'No Guard',type:'None',wt:11
							},
							pinsirite:{
								atk:30,def:20,spa:10,spd:20,spe:20,ability:'Aerilate',type:'Flying',wt:4
							},
							sablenite:{
								atk:10,def:50,spa:20,spd:50,spe:-30,ability:'Magic Bounce',type:'None',wt:150
							},
							salamencite:{
								atk:10,def:50,spa:10,spd:10,spe:20,ability:'Aerilate',type:'None',wt:10
							},
							sceptilite:{
								atk:25,def:10,spa:40,spd:0,spe:25,ability:'Lightning Rod',type:'Dragon',wt:3
							},
							scizorite:{
								atk:20,def:40,spa:10,spd:20,spe:10,ability:'Technician',type:'None',wt:7
							},
							sharpedonite:{
								atk:20,def:30,spa:15,spd:25,spe:10,ability:'Strong Jaw',type:'None',wt:41.5
							},
							slowbronite:{
								atk:0,def:70,spa:30,spd:00,spe:0,ability:'Shell Armor',type:'None',wt:31.5
							},
							steelixite:{
								atk:40,def:30,spa:0,spd:30,spe:0,ability:'Sand Force',type:'None',wt:340
							},
							swampertite:{
								atk:40,def:20,spa:10,spd:20,spe:10,ability:'Swift Swim',type:'None',wt:20.1
							},
							tyranitarite:{
								atk:40,def:20,spa:10,spd:20,spe:10,ability:'Sand Stream',type:'None',wt:53
							},
							venusaurite:{
								atk:18,def:40,spa:22,spd:20,spe:00,ability:'Thick Fat',type:'None',wt:55.5
							},
							'red orb':{
								atk:30,def:20,spa:50,spd:00,spe:00,ability:'Desolate Land',type:'Fire',wt:49.7
							},
							'blue orb':{
								atk:50,def:0,spa:30,spd:20,spe:00,ability:'Primodal Sea',type:'None',wt:78
							},
							beedrillite:{
								atk:60,def:0,spa:-30,spd:0,spe:70,ability:'Adaptability',type:'None',wt:11
							},
							blazikenite:{
								atk:40,def:10,spa:20,spd:10,spe:20,ability:'Speed Boost',type:'None',wt:0
							},
							kangaskhanite:{
								atk:30,def:20,spa:20,spd:20,spe:10,ability:'Parental Bond',type:'None',wt:20
							},
							mawilite:{
								atk:20,def:40,spa:0,spd:40,spe:00,ability:'Huge Power',type:'None',wt:12
							},
							medichamite:{
								atk:40,def:10,spa:20,spd:10,spe:20,ability:'Pure Power',type:'None',wt:0
							}
					};
         var separated = arg.split(" ");
	     var stone=(""+separated[0]).toLowerCase();
	     var name=(""+separated[1]).toLowerCase();
	     var justincase=(""+separated[2]).toLowerCase();
	     stone=rebuild(stone);
	     name=rebuild(name);
	     justincase=rebuild(justincase);
	     if(name=='x'||name=='y'||name=='orb')
	     {
	     	stone = stone+' '+name;
	     	name=justincase;
	     }
	     if(arg=='' || arg==' ')
	     	this.say(room,"Usage: ``.mnm <Mega Stone Name> <Pokemon Name>``");
	     else if(stones[stone]==undefined)
	     	this.say(room,"Error: Mega stone not found")
	     else if(pokemen[name]==undefined)
	     	this.say(room,"Error: Pokemon not found");
	     else
	     {
		     if(!isMega(name))
		     {
			     var tot = {};
			     var secondtype;
			     if(stones[stone].type!='None')
			     {
			     	if(stones[stone].type==pokemen[name].types[0])
			     	secondtype="";
			     	else
			     		secondtype="/"+stones[stone].type;
			     }
			     else
			     {
			     if(pokemen[name].types[1]==undefined)
			     	secondtype="";
			     else
			     	secondtype="/"+pokemen[name].types[1];
			     }
			     tot['hp']=pokemen[name].baseStats.hp;
			     tot['atk']=pokemen[name].baseStats.atk+stones[stone].atk;
			     tot['def']=pokemen[name].baseStats.def+stones[stone].def;
			     tot['spa']=pokemen[name].baseStats.spa+stones[stone].spa;
			     tot['spd']=pokemen[name].baseStats.spd+stones[stone].spd;
			     tot['spe']=pokemen[name].baseStats.spe+stones[stone].spe;
			     tot['wt']=pokemen[name].weightkg+stones[stone].wt;
			     tot['type']=pokemen[name].types[0]+secondtype;
			     var gnbp=function(wtkg)
		         {
		        	var bp;
		        	if(wtkg>0.1 && wtkg<=9.9)
		        		bp=20;
		        	if(wtkg>10 && wtkg<=24.9)
		        		bp=40;
		        	if(wtkg>25 && wtkg<=49.9)
		        		bp=60;
		        	if(wtkg>50 && wtkg<=99.9)
		        		bp=80;
		        	if(wtkg>100 && wtkg<=199.9)
		        		bp=100;
		        	if(wtkg>199.9)
		        		bp=120;
		        	return bp;
		         }
			     if(tot['hp']>255||tot['hp']<0||tot['atk']>255||tot['atk']<0||tot['def']>255||tot['def']<0||tot['spa']>255||tot['spa']<0||tot['spd']>255||tot['spd']<0||tot['spe']>255||tot['spe']<0)
			     	text+="This pokemon cant be used because a base stat goes lower than 0, or more than 255. "
			     else
			     text += "**The new stats are**: "+tot['hp']+"/"+tot['atk']+"/"+tot['def']+"/"+tot['spa']+"/"+tot['spd']+"/"+tot['spe']+" **Ability**:"+stones[stone].ability+" **Type**:"+tot['type']+" **GrassKnot/LowKick Base Power:**:"+gnbp(tot['wt']);
			     
		 	}
		 	else
		 		text+="Uh, I don't think you can mega evolve a mega Pokemon...."
		 		this.say(room,text);
	     }
	},
	'note':function(arg,by,room)
	{
		if(arg!='')
		{
			var rom,b;
			if(room.charAt(0)==',')rom="PMs";
			else
				rom=room;
			if(by.charAt(0)=='+' || by.charAt(0)=='%' || by.charAt(0)=='@' || by.charAt(0)=='#' || by.charAt(0)=='&' || by.charAt(0)=='~' || by.charAt(0)==' ')
        {
            for(var i=0;i<by.length;i++)
            {
            if(i!=0)
            b+=by.charAt(i);
        	else
        		b='-';
        	}
        }
			console.log(b.green+" Notes: \""+arg.yellow+"\""+" in room: "+rom.yellow);
			this.say(room,"Your message has successfully been logged to the Bot's console.");
		}
		else
		{
			this.say(room,"Usage: ``.note <Message>``. Logs a message to the Bot's console, so that the owner can read it. Use it to log bugs reports to the console when the owner is away.");
		}
	},
	fuse: function(arg, by, room) {
        var text = "";
        var separated = arg.split(",");
        var name = (("" + separated[0]).trim()).toLowerCase();
        var name2 = (("" + separated[1]).trim()).toLowerCase();
        name = rebuild(name);
        name2 = rebuild(name2);

        if (pokemen[name] == undefined || pokemen[name2] == undefined)
        {
                this.say(room, "Error: Pokemon not found")
        }
        else {
                var baseStats = {};
                baseStats['avehp'] = Math.floor((pokemen[name].baseStats.hp + pokemen[name2].baseStats.hp) / 2);
                baseStats['aveatk'] = Math.floor((pokemen[name].baseStats.atk + pokemen[name2].baseStats.atk) / 2);
                baseStats['avedef'] = Math.floor((pokemen[name].baseStats.def + pokemen[name2].baseStats.def) / 2);
                baseStats['avespa'] = Math.floor((pokemen[name].baseStats.spa + pokemen[name2].baseStats.spa) / 2);
                baseStats['avespd'] = Math.floor((pokemen[name].baseStats.spd + pokemen[name2].baseStats.spd) / 2);
                baseStats['avespe'] = Math.floor((pokemen[name].baseStats.spe + pokemen[name2].baseStats.spe) / 2);
                var type = pokemen[name].types[0];
                if (pokemen[name].types[0] != pokemen[name2].types[0])
                        type = type + '/' + pokemen[name2].types[0];
                var bst = baseStats['avehp'] + baseStats['aveatk'] + baseStats['avedef'] + baseStats['avespa'] + baseStats['avespd'] + baseStats['avespe'];
                text = "Stats: " + baseStats['avehp'] + "/" + baseStats['aveatk'] + "/" + baseStats['avedef'] + "/" + baseStats['avespa'] + "/" + baseStats['avespd'] + "/" + baseStats['avespe'] + " **BST**:" + bst + " **Type:** " + type;
                this.say(room, text);
        }
},
	'ei':function(arg,by,room)
	{
		var abilities =
		{
			aerilate : 'Air Balloon',
			adaptability : 'Apicot Berry',
			adapt : 'Apicot Berry',
			analytic:'Water Gem',
			anticipation : 'Black Belt',
			arenatrap : 'Bug Gem',
			aromaveil : 'Black Glasses',
			aurabreak : 'Black Sludge',
			baddreams : 'BrightPowder',
			battlearmor : 'Cell Battery',
			bigpecks : 'Charcoal',
			blaze : 'Charti Berry',
			bulletproof : 'Chesto Berry',
			cheekpouch : 'Chilan Berry',
			chlorophyll : 'Chople Berry',
			clearbody : 'Coba Berry',
			cloudnine : 'Colbur Berry',
			colorchange : 'Custap Berry',
			competitive : 'Damp Rock',
			compoundeyes : 'Dragon Fang',
			contrary : 'Dark Gem',
			cursedbody : 'Eject Button',
			cutecharm : 'Expert Belt',
			damp : 'Flame Orb',
			darkaura : 'Focus Band',
			defeatist : 'Full Incense',
			defiant : 'Ganlon Berry',
			deltastream : 'Grepa Berry',
			desolateland : 'Grip Claw',
			desoland : 'Grip Claw',
			download : 'Haban Berry',
			drizzle : 'Hard Stone',
			drought : 'Heat Rock',
			dryskin : 'Iapapa Berry',
			earlybird : 'Icy Rock',
			effectspore : 'Kasib Berry',
			fairyaura : 'Kebia Berry',
			filter : 'Kee Berry',
			flamebody : 'Kelpsy Berry',
			flareboost : 'King\'s Rock',
			flashfire : 'Lagging Tail',
			flowergift : 'Lansat Berry',
			flowerveil : 'Lax Incense',
			forecast : 'Leppa Berry',
			forewarn : 'Liechi Berry',
			friendguard : 'Luminous Moss',
			frisk : 'Magnet',
			furcoat : 'Dragon Gem',
			fc : 'Dragon Gem',
			galewings : 'Maranga Berry',
			gw : 'Maranga Berry',
			gluttony : 'Metal Coat',
			gooey: 'Metronome',
			grasspelt : 'Micle Berry',
			guts: 'Miracle Seed',
			harvest : 'Muscle Band',
			healer : 'Mystic Water',
			heatproof : 'Never-Melt Ice',
			heavymetal : 'Occa Berry',
			honeygather : 'Odd Incense',
			hugepower : 'Electric Gem',
			hustle : 'Passho Berry',
			hydration : 'Payapa Berry',
			hypercutter : 'Petaya Berry',
			icebody : 'Poison Barb',
			illuminate : 'Quick Claw',
			illusion : 'Razor Claw',
			immunity : 'Razor Fang',
			imposter : 'Fairy Gem',
			infiltrator : 'Rindo Berry',
			innerfocus : 'Rock Incense',
			insomnia : 'Rose Incense',
			intimidate : 'Red Card',
			intim : 'Red Card',
			ironbarbs : 'Roseli Berry',
			ironfist : 'Safety Goggles',
			justified : 'Salac Berry',
			keeneye : 'Scope Lens',
			klutz : 'Sea Incense',
			leafguard : 'Sharp Beak',
			levitate : 'Nomel Berry',
			lightmetal : 'Shell Bell',
			lightningrod : 'Shuca Berry',
			limber : 'Silk Scarf',
			liquidooze : 'SilverPowder',
			mbounce : 'Smooth Rock',
			magicbounce : 'Smooth Rock',
			magicguard : 'Snowball',
			mguard : 'Snowball',
			magician : 'Soft Sand',
			magmaarmor : 'Spell Tag',
			magnetpull : 'Starf Berry',
			marvelscale : 'Sticky Barb',
			megalauncher : 'Tanga Berry',
			minus : 'TwistedSpoon',
			moldbreaker : 'Wacan Berry',
			moody : 'Wave Incense',
			motordrive : 'Weakness Policy',
			moxie : 'White Herb',
			multiscale : 'Wide Lens',
			multitype : 'Wise Glasses',
			mummy : 'Yache Berry',
			naturalcure : 'Zoom Lens',
			noguard : 'Adamant Orb',
			normalize : 'Burn Drive',
			oblivious : 'Chill Drive',
			overcoat : 'DeepSeaScale',
			overgrow : 'DeepSeaTooth',
			owntempo : 'Douse Drive',
			parentalbond : 'Fire Gem',
			pbond : 'Fire Gem',
			pickpocket : 'Light Ball',
			pickup : 'Lucky Punch',
			pixilate : 'Griseous Orb',
			plus : 'Lustrous Orb',
			poisonheal : 'Metal Powder',
			ph : 'Metal Powder',
			poisonpoint : 'Quick Powder',
			poisontouch : 'Shock Drive',
			prankster : 'Mail',
			prank : 'Soul Dew',
			pressure : 'Stick',
			primordialsea : 'Thick Club',
			primsea : 'Thick Club',
			protean : 'Aguav Berry',
			purepower : 'Ice Gem',
			quickfeet : 'Aspear Berry',
			raindish : 'Binding Band',
			rattled : 'Cheri Berry',
			reckless : 'Destiny Knot',
			refrigerate : 'Enigma Berry',
			fridge : 'Enigma Berry',
			regen : 'Figy Berry',
			regenerator : 'Figy Berry',
			rivalry : 'Float Stone',
			rockhead : 'Iron Ball',
			roughskin : 'Jaboca Berry',
			runaway : 'Macho Brace',
			sandforce : 'Mago Berry',
			sandrush : 'Oran Berry',
			sandstream : 'Pecha Berry',
			sandveil : 'Persim Berry',
			sapsipper : 'Rawst Berry',
			scrappy : 'Ring Target',
			serenegrace : 'Rowap Berry',
			serenevil : 'Rowap Berry',
			shadowtag : 'Poison Gem',
			shedskin : 'Wiki Berry',
			sheerforce : 'Armor Fossil',
			sf : 'Armor Fossil',
			shellarmor : 'Belue Berry',
			shielddust : 'Bluk Berry',
			simple : 'Psychic Gem',
			skilllink : 'Cherish Ball',
			slowstart : 'Claw Fossil',
			sniper : 'Cornn Berry',
			snowcloak : 'Cover Fossil',
			snowwarning : 'Dive Ball',
			solarpower : 'Dome Fossil',
			solidrock : 'Dream Ball',
			soundproof : 'Durin Berry',
			speedboost : 'Dusk Ball',
			stall : 'Electrizer',
			stancechange : 'Energy Powder',
			static : 'Fast Ball',
			steadfast : 'Freind Ball',
			stench : 'Great Ball',
			stickyhold : 'Heal Ball',
			stormdrain : 'Heavy Ball',
			strongjaw : 'Helix Fossil',
			sturdy : 'Hondew Berry',
			suctioncups : 'Level Ball',
			superluck : 'Love Ball',
			swarm : 'Lure Ball',
			sweetveil : 'Luxury Ball',
			swiftswim : 'Magost Berry',
			symbiosis : 'Master Ball',
			synchronize : 'Moon Ball',
			tangledfeet : 'Nanab Berry',
			technician : 'Nest Ball',
			tech : 'Nest Ball',
			telepathy : 'Net Ball',
			thickfat : 'Old Amber',
			tintedlens : 'Pamtre Berry',
			torrent : 'Park Ball',
			toughclaws : 'Pinap Berry',
			toxicboost : 'Plume Fossil',
			trace : 'Poke Ball',
			truant : 'Pomeg Berry',
			unaware : 'Qualot Berry',
			unburden : 'Quick Ball',
			unnerve : 'Rabuta Berry',
			victorystar : 'Rare Bone',
			vitalspirit : 'Razz Berry',
			voltabsorb : 'Repeat Ball',
			waterabsorb : 'Root Fossil',
			waterveil : 'Safari Ball',
			weakarmor : 'Skull Fossil',
			whitesmoke : 'Spelon Berry',
			wonderguard : 'Steel Gem',
			wg : 'Steel Gem',
			wonderskin : 'Sport Ball',
			zenmode : 'Tamato Berry',
			aftermath : 'Premier Ball'
		};
		var text = "";//this.hasRank(by, '+%@#&~') || room.charAt(0) === ',' ? '' : '/pm ' + by + ', ';
	        var abe = rebuild(arg.toLowerCase(arg));
	        if(arg=='')
	        	text+="Usage: ``.ei <Ability>``"
			else if(arg=='bans')
	        	text+="The current banlist for Enchanted Items is: Ubers, Kyurem-Black, Chatter, Shedinja, and the held abilities of Arena Trap, Contrary, Fur Coat, Huge Power, Imposter, Parental Bond, Pure Power, Shadow Tag, Simple, Trace(temporarily) and Wonder Guard.";
	        else if(arg=='retain')
	        	text+="These items retain their effects in EI: Assault Vest, Choice Band, Choice Scarf, Choice Specs, Eviolite, Focus Sash, Leftovers, Life Orb, Light Clay, Lum Berry, Mental Herb, Power Herb, Rocky Helmet, Sitrus Berry, Toxic Orb, Mega Stones and Type Plates."
	        else if(arg=='turboblaze' || arg == 'teravolt')
	        	text+="Please use Mold Breaker instead of that ability, because it doesn't have an Enchanted Item anymore. The Enchanted Item for Mold Breaker is: Wacan Berry.";
	        else if(abilities[abe]==undefined)
	        	text+="Sorry, that ability does not exist."
	        else
	        	text+="The Enchanted Item for "+arg+" is "+abilities[abe]+".";
	        this.say(room,text);
    	/*}
    	else
    	{
    		text+="Usage: ``.ei <Ability>";
    		this.say(room,text);
    	}*/
	},
    'ie':function(arg,by,room)
    {
        var items =
        {
                airballoon:'Aerilate',/* 'airballoon*/
                apicotberry:'Adaptability',/* 'apicotberry*/
                premierball:'Aftermath',/* 'premierball*/
                watergem:'Analytic',/* 'watergem*/
                blackbelt:'Anticipation',/* 'blackbelt*/
                buggem:'Arena Trap',/* 'buggem*/
                blackglasses:'Aroma Veil',/* 'blackglasses*/
                blacksludge:'Aura Break',/* 'blacksludge*/
                brightpowder:'Bad Dreams',/* 'brightpowder*/
                cellbattery:'Battle Armor',/* 'cellbattery*/
                charcoal:'Big Pecks',/* 'charcoal*/
                chartiberry:'Blaze',/* 'chartiberry*/
                chestoberry:'Bulletproof',/* 'chestoberry*/
                chilanberry:'Cheek Pouch',/* 'chilanberry*/
                chopleberry:'Chlorophyll',/* 'chopleberry*/
                cobaberry:'Clear body',/* 'cobaberry*/
                colburberry:'Cloud Nine',/* 'colburberry*/
                custapberry:'Color Change',/* 'custapberry*/
                damprock:'Competitive',/* 'damprock*/
                dragonfang:'Compound Eyes',/* 'dragonfang*/
                darkgem:'Contrary',/* 'darkgem*/
                ejectbutton:'Cursed Body',/* 'ejectbutton*/
                expertbelt:'Cute Charm',/* 'expertbelt*/
                flameorb:'Damp',/* 'flameorb*/
                focusband:'Dark Aura',/* 'focusband*/
                fullincense:'Defeatist',/* 'fullincense*/
                ganlonberry:'Defiant',/* 'ganlonberry*/
                grepaberry:'Delta Stream',/* 'grepaberry*/
                gripclaw:'Desolate Land',/* 'gripclaw*/
                habanberry:'Download',/* 'habanberry*/
                hardstone:'Drizzle',/* 'hardstone*/
                heatrock:'Drought',/* 'heatrock*/
                iapapaberry:'Dry Skin',/* 'iapapaberry*/
                icyrock:'Early Bird',/* 'icyrock*/
                kasibberry:'Effect Spore',/* 'kasibberry*/
                kebiaberry:'Fairy Aura',/* 'kebiaberry*/
                keeberry:'Filter',/* 'keeberry*/
                kelpsyberry:'Flame Body',/* 'kelpsyberry*/
                kingsrock:'Flare Boost',/* 'kingsrock*/
                laggingtail:'Flash Fire',/* 'laggingtail*/
                lansatberry:'Flower Gift',/* 'lansatberry*/
                laxincense:'Flower Veil',/* 'laxincense*/
                leppaberry:'Forecast',/* 'leppaberry*/
                liechiberry:'Forewarn',/* 'liechiberry*/
                luminousmoss:'Friend Guard',/* 'luminousmoss*/
                magnet:'Frisk',/* 'magnet*/
                dragongem:'Fur Coat',/* 'dragongem*/
                marangaberry:'Gale Wings',/* 'marangaberry*/
                metalcoat:'Gluttony',/* 'metalcoat*/
                metronome:'Gooey',/* 'metronome*/
                micleberry:'Grass Pelt',/* 'micleberry*/
                miracleseed:'Guts',/* 'miracleseed*/
                muscleband:'Harvest',/* 'muscleband*/
                mysticwater:'Healer',/* 'mysticwater*/
                nevermeltice:'Heat Proof',/* 'nevermeltice*/
                occaberry:'Heavy Metal',/* 'occaberry*/
                oddincense:'Honeygather',/* 'oddincense*/
                electricgem:'Huge Power',/* 'electricgem*/
                passhoberry:'Hustle',/* 'passhoberry*/
                payapaberry:'Hydration',/* 'payapaberry*/
                petayaberry:'Hyper Cutter',/* 'petayaberry*/
                poisonbarb:'Ice Body',/* 'poisonbarb*/
                quickclaw:'illuminate',/* 'quickclaw*/
                razorclaw:'Illusion',/* 'razorclaw*/
                razorfang:'Immunity',/* 'razorfang*/
                fairygem:'Imposter',/* 'fairygem*/
                rindoberry:'Infiltrator',/* 'rindoberry*/
                rockincense:'Inner Focus',/* 'rockincense*/
                roseincense:'Insomnia',/* 'roseincense*/
                redcard:'Intimidate',/* 'redcard*/
                roseliberry:'Iron Barbs',/* 'roseliberry*/
                safetygoggles:'Ironfist',/* 'safetygoggles*/
                salacberry:'Justified',/* 'salacberry*/
                scopelens:'Keen Eye',/* 'scopelens*/
                seaincense:'Klutz',/* 'seaincense*/
                sharpbeak:'Leaf Guard',/* 'sharpbeak*/
                nomelberry:'Levitate',/* 'shedshell*/
                shellbell:'Light Metal',/* 'shellbell*/
                shucaberry:'Lightning Rod',/* 'shucaberry*/
                silkscarf:'Limber',/* 'silkscarf*/
                silverpowder:'Liquid Ooze',/* 'silverpowder*/
                smoothrock:'Magic Bounce',/* 'smoothrock*/
                snowball:'Magic Guard',/* 'snowball*/
                softsand:'magician',/* 'softsand*/
                spelltag:'magmaarmor',/* 'spelltag*/
                starfberry:'Magnet Pull',/* 'starfberry*/
                stickybarb:'marvelscale',/* 'stickybarb*/
                tangaberry:'Mega Launcher',/* 'tangaberry*/
                twistedspoon:'minus',/* 'twistedspoon*/
                wacanberry:'Mold Breaker',/* 'wacanberry*/
                waveincense:'moody',/* 'waveincense*/
                weaknesspolicy:'motordrive',/* 'weaknesspolicy*/
                whiteherb:'Moxie',/* 'whiteherb*/
                widelens:'Multiscale',/* 'widelens*/
                wiseglasses:'multitype',/* 'wiseglasses*/
                yacheberry:'Mummy',/* 'yacheberry*/
                zoomlens:'Natural Cure',/* 'zoomlens*/
                adamantorb:'No Guard',/* 'adamantorb*/
                burndrive:'Normalize',/* 'burndrive*/
                chilldrive:'Oblivious',/* 'chilldrive*/
                deepseascale:'Overcoat',/* 'deepseascale*/
                deepseatooth:'Overgrow',/* 'deepseatooth*/
                dousedrive:'Own Tempo',/* 'dousedrive*/
                firegem:'Parental Bond',/* 'firegem*/
                lightball:'Pickpocket',/* 'lightball*/
                luckypunch:'Pickup',/* 'luckypunch*/
                griseousorb:'Pixilate',/* 'griseousorb*/
                lustrousorb:'Plus',/* 'lustrousorb*/
                metalpowder:'Poison Heal',/* 'metalpowder*/
                quickpowder:'Poison Point',/* 'quickpowder*/
                shockdrive:'Poison Touch',/* 'shockdrive*/
                mail:'Prankster',/* 'mail*/
                stick:'Pressure',/* 'stick*/
                thickclub:'Primordial Sea',/* 'thickclub*/
                aguavberry:'Protean',/* 'aguavberry*/
                icegem:'purepower',/* 'icegem*/
                aspearberry:'quickfeet',/* 'aspearberry*/
                bindingband:'Rain Dish',/* 'bindingband*/
                cheriberry:'Rattled',/* 'cheriberry*/
                destinyknot:'Reckless',/* 'destinyknot*/
                enigmaberry:'Refrigerate',/* 'enigmaberry*/
                figyberry:'Regenerator',/* 'figyberry*/
                floatstone:'Rivalry',/* 'floatstone*/
                ironball:'Rock Head',/* 'ironball*/
                jabocaberry:'Rough Skin',/* 'jabocaberry*/
                machobrace:'runaway',/* 'machobrace*/
                magoberry:'Sand Force',/* 'magoberry*/
                oranberry:'Sand Rush',/* 'oranberry*/
                pechaberry:'Sand Stream',/* 'pechaberry*/
                persimberry:'Sand Veil',/* 'persimberry*/
                rawstberry:'Sap Sipper',/* 'rawstberry*/
                ringtarget:'Scrappy',/* 'ringtarget*/
                rowapberry:'Serene Grace',/* 'rowapberry*/
                poisongem:'Shadow Tag',/* 'poisongem*/
                wikiberry:'Shed Skin',/* 'wikiberry*/
                armorfossil:'Sheer Force',/* 'armorfossil*/
                belueberry:'Shell Armor',/* 'belueberry*/
                blukberry:'Shield Dust',/* 'blukberry*/
                psychicgem:'Simple',/* 'psychicgem*/
                cherishball:'Skill Link',/* 'cherishball*/
                clawfossil:'Slow Start',/* 'clawfossil*/
                cornnberry:'Sniper',/* 'cornnberry*/
                coverfossil:'Snow Cloak',/* 'coverfossil*/
                diveball:'Snow Warning',/* 'diveball*/
                domefossil:'Solar Power',/* 'domefossil*/
                dreamball:'Solid Rock',/* 'dreamball*/
                durinberry:'Soundproof',/* 'durinberry*/
                duskball:'Speed Boost',/* 'duskball*/
                electirizer:'stall',/* 'electirizer*/
                energypowder:'Stancechange',/* 'energypowder*/
                fastball:'Static',/* 'fastball*/
                friendball:'Steadfast',/* 'friendball*/
                greatball:'Stench',/* 'greatball*/
                healball:'Sticky Hold',/* 'healball*/
                heavyball:'Storm Drain',/* 'heavyball*/
                helixfossil:'Strong Jaw',/* 'helixfossil*/
                hondewberry:'Sturdy',/* 'hondewberry*/
                levelball:'Suctioncups',/* 'levelball*/
                loveball:'Super Luck',/* 'loveball*/
                lureball:'Swarm',/* 'lureball*/
                luxuryball:'Sweet Veil',/* 'luxuryball*/
                magostberry:'Swift Swim',/* 'magostberry*/
                masterball:'Symbiosis',/* 'masterball*/
                moonball:'Synchronize',/* 'moonball*/
                nanabberry:'Tangledfeet',/* 'nanabberry*/
                nestball:'Technician',/* 'nestball*/
                netball:'Telepathy',/* 'netball*/
                oldamber:'Thick Fat',/* 'oldamber*/
                pamtreberry:'Tinted Lens',/* 'pamtreberry*/
                parkball:'Torrent',/* 'parkball*/
                pinapberry:'Tough Claws',/* 'pinapberry*/
                plumefossil:'Toxic Boost',/* 'plumefossil*/
                pokeball:'Trace',/* 'pokeball*/
                pomegberry:'Truant',/* 'pomegberry*/
                qualotberry:'Unaware',/* 'qualotberry*/
                quickball:'Unburden',/* 'quickball*/
                rabutaberry:'Unnerve',/* 'rabutaberry*/
                rarebone:'Victory Star',/* 'rarebone*/
                razzberry:'Vitalspirit',/* 'razzberry*/
                repeatball:'Volt Absorb',/* 'repeatball*/
                rootfossil:'Water Absorb',/* 'rootfossil*/
                safariball:'Water Veil',/* 'safariball*/
                skullfossil:'Weak Armor',/* 'skullfossil*/
                spelonberry:'White Smoke',/* 'spelonberry*/
                steelgem:'Wonder Guard',/* 'steelgem*/
                sportball:'Wonder Skin',/* 'sportball*/
                tamatoberry:'Zen Mode',/* 'tamatoberry*/
        };
        var text = "";
            var abe = rebuild(arg.toLowerCase(arg));
            if(arg=='')
                text+="Usage: ``.ie <Item>``";
            else if(arg=='retain')
                text+="These items retain their effects in EI: Assault Vest,Choice Band,Choice Scarf,Choice Specs,Eviolite,Focus Sash,Leftovers,Life Orb,Light Clay,Lum Berry,Mental Herb,Power Herb,Rocky Helmet,Sitrus Berry,Toxic Orb,Mega Stones,Type Plates."
            else if(items[abe]==undefined)
                text+="Sorry, that item does not exist, or isn't Enchanted."
            else
                text+="The item "+arg+" gives the ability "+items[abe]+".";
            this.say(room,text);
        /*}
        else
        {
            text+="Usage: ``.ei <Ability>";
            this.say(room,text);
        }*/
    },
};
