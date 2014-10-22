
function Util(){}
//temperature
Util.CtoF = function(x){
	return x * 9 / 5 + 32;
}

Util.FtoC = function(x){
	return (x -32) * 5 / 9;
}
//temp diff
Util.dCtodF = function(x){
	return x * 9/5;
}

Util.dFtodC = function(x){
	return  x / (9/5);
}
//length
Util.FttoM = function(x){
	return x * 0.3048;
}

Util.MtoFt = function(x){
	return x / 0.3048;
}

Util.IntoM = function(x){
	return x * 0.0254;
}

Util.MtoIn = function(x){
	return x / 0.0254;
}

//area
Util.SftoSm = function(x){
	return x * 0.0929;
}

Util.SmtoSf = function(x){
	return x / 0.0929;
}
//load
Util.KBtutoKw = function(x){
	return x / 3.412142;
}

Util.KwtoKBtu = function(x){
	return x * 3.412142;
}
//airflow
Util.CfmtoCms = function(x){
	return x * 0.471947;
}

Util.CmstoCfm = function(x){
	return x / 0.471947;
}
//speed
Util.CfmPtoMps = function(x){
	return x * (0.471947/0.0929);
}

Util.MpstoCfmP = function(x){
	return x / (0.471947/0.0929);
}
//loaddensity
Util.WpfttoWpm = function(x){
	return x / 0.0929;
}

Util.WpmtoWpf = function(x){
	return x * 0.0929;
}