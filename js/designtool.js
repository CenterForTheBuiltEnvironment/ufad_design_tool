var IPtoSI;
var mark;

function satInput() {
    var input = document.forms['input'];
    plenumConfig = input.plenumConfig.value;
    if (plenumConfig == "Series" || plenumConfig == "Common Plenum"){
        input.intSupplyPlenumT.disabled = false;
        input.perSupplyPlenumT.disabled = true;
    }else if(plenumConfig == "Reverse Series"){
        input.intSupplyPlenumT.disabled = true;
        input.perSupplyPlenumT.disabled = false;
    }else {
        input.intSupplyPlenumT.disabled = false;
        input.perSupplyPlenumT.disabled = false;
    }
}

function setDefaults() {
    var input = document.forms['input'];
    input.plenumConfig.value = "Series";
    input.intRoomHeight.value = 9;       
    input.intFloorArea.value  = 3500;  
    input.intFloorLevel.value = 'Middle Floor';
    console.log("you are about to set the default diff value"); 
    $('#intDiffType').ddslick('select', {index: 0 });
    input.intNumDiffs.value = 20;        
    input.intCoolingLoadMixed.value = 31.5;
    input.intOccupiedT.value = 75;     
    input.intLeakage.value = 0.05;       
    input.intSupplyPlenumT.value = 63;
    
                  
    input.perRoomHeight.value = 9;       
    input.perFloorArea.value  = 1500;  
    input.perFloorLevel.value = 'Middle Floor';
    console.log("start to select the diff");
    $('#perDiffType').ddslick('select', {index: 1 });
    console.log("you successfully set the per diff'");
    input.barGrilleLength.value = 48;
    input.infloorCap.value = 0;
    input.perNumDiffs.value = 18;        
    input.perCoolingLoadMixed.value = 36;
    input.perOccupiedT.value = 75;     
    input.perLeakage.value = 0.05;       
    input.numOccupants.value = 20; 
    input.blinds.value = "up";      
    input.zoneOrientation.value = "South";
    input.extWallLength.value = 100;
    input.perSupplyPlenumT.disabled = true;
}

function validate_input() {
    var warning = "";
    if (plenumConfig == "") warning = warning + "Please select a plenum configuration.\n";
    if (intRoomHeight > 40 | intRoomHeight < 1 | isNaN(intRoomHeight)) warning = warning + "The interior room height is invalid.\n";
    if (isNaN(intFloorArea) | intFloorArea <= 0) warning = warning + "The interior floor area is invalid.\n";
    if (intFloorLevel == "") warning = warning + "Please select the interior floor level.\n";
    if (intDiffType == "") warning = warning + "Please select the interior diffuser type.\n";
    if (intNumDiffs < 1 | isNaN(intNumDiffs)) warning = warning + "The number of interior diffusers is invalid.\n";
    if (intCoolingLoadMixed < 0 | isNaN(intCoolingLoadMixed)) warning = warning + "The interior cooling load is invalid.\n";
    if (intOccupiedT > 90 | intOccupiedT < 60 | isNaN(intOccupiedT)) warning = warning + "The design occupied zone temperature is invalid.\n";
    if (intLeakage > 5 | isNaN(intLeakage)) warning = warning + "The interior leakage is invalid.\n";
    if (plenumConfig != "Reverse Series" & (intAhuT < 40 | intAhuT > intOccupiedT | isNaN(intAhuT))) {
        warning = warning + "The setpoint temperature in the interior plenum is invalid.\n";    }
    if (perRoomHeight > 40 | perRoomHeight < 1 | isNaN(perRoomHeight)) warning = warning + "The perimeter room height is invalid.\n";
    if (isNaN(perFloorArea)) warning = warning + "The perimeter floor area is invalid.\n";
    if (perFloorLevel == "") warning = warning + "Please select the perimeter floor level.\n";
    if (perDiffType == "") warning = warning + "Please select the perimeter diffuser type.\n";
    if (perNumDiffs < 1 | isNaN(perNumDiffs)) warning = warning + "The number of perimeter diffusers is invalid.\n";
    if (perCoolingLoadMixed < 0 | isNaN(perCoolingLoadMixed)) warning = warning + "The perimeter cooling load is invalid.\n";
    if (perOccupiedT > 90 | perOccupiedT < 60 | isNaN(perOccupiedT)) warning = warning + "The design occupied zone temperature is invalid.\n";
    if (perLeakage > 5 | isNaN(perLeakage)) warning = warning + "The perimeter leakage is invalid.\n";
    if ((plenumConfig != "Series" & plenumConfig !="Common Plenum") & (perAhuT < 40 | perAhuT > perOccupiedT | isNaN(perAhuT))) {
        warning = warning + "The setpoint temperature in the perimeter plenum is invalid.\n";    }
    if (numOccupants <= 0 | isNaN(numOccupants)) warning = warning + "The number of occupants is invalid.\n";
    if (zoneOrientation == "") warning = warning + "Please select the perimeter zone orientation.\n"
    if (extWallLength < 1 | extWallLength > intFloorArea | isNaN(extWallLength)) warning = warning + "The exterior wall length is invalid.\n";
    if (warning != "") {
        alert(warning);
        return true;
    }else {
        return false;
    }
}

function get_int_phi(intGamma, intDiffType) {    
    if(intDiffType === 'Swirl'){
		intPhi67 = 0.951;
		if(intGamma > 78.4){
            intPhi4 = 0.9155;
            } else if(intGamma > 7.0){
            	intPhi4 = 0.2075 * Math.pow(intGamma,0.3403);
            } else {
            	intPhi4 = 0.4024;
            }
            } else if (intDiffType === 'VAV Directional Int.'){
     	if(intGamma > 9.1){
     		intPhi4 = 0.8700;
     		intPhi67 = 0.9896;
     	    } else if (intGamma > 1.0){
     	    	intPhi4 = 0.1645 * Math.log(intGamma) + 0.5076;
     	    	intPhi67 = 0.0078*intGamma + 0.9186;
     	    } else {
     	    	intPhi4 = 0.5076;
     	    	intPhi67 = 0.9264;
     	    }
     	    }
}

function get_per_phi(perGamma, perDiffType) {
	if(perDiffType == 'VAV Directional Per.'){
		if(perGamma > 15){
			if(blinds == 'down'){
				perPhi4 = 0.8987 - 0.13;
			}else {
				perPhi4 = 0.8987;
			}
			perPhi67 = 1.0018;
			}else if (perGamma > 2.9){
				if(blinds == 'down'){
					perPhi4 = 0.4605+0.0292 * perGamma - 0.13;
				}else{
					perPhi4 = 0.4605+0.0292 * perGamma;
				}
				perPhi67 = 0.7168 + 0.0190 * perGamma;
				}else{
					if(blinds == 'down'){
						perPhi4 = 0.5452 - 0.13;
					}else{
						perPhi4 = 0.5452;
					}
					perPhi67 = 0.7719;
					}
				}else if(perDiffType == 'Linear Bar Grille CBE' || perDiffType == 'Linear Bar Grille RP'){
					if(perGamma > 23){
						if(blinds == 'down'){
							perPhi4=1.1074-0.13;
						}else{
							perPhi4=1.1074;
						}
						perPhi67 = 1.2535;
					}else if(perGamma >2.7){
						if(blinds == 'down'){
							perPhi4 = 0.1282 + 0.0908 * perGamma - 0.0021 *  Math.pow(perGamma,2) - 0.13;
						}else{
							perPhi4 = 0.1282 + 0.0908 * perGamma - 0.0021 *  Math.pow(perGamma,2);
						}
						perPhi67 = 0.7742+0.0208 * perGamma;
					 }else{
					 	if(blinds == 'down'){
					 		perPhi4 = 0.3582 - 0.13 ;
					 	}else{
					 		perPhi4 = 0.3582;
					 	}
     	    			perPhi67 = 0.8305;
     	    		}
     	    }
}

/*
//This is the code for updated Gamma phi equations
function get_int_phi(intGamma, intDiffType) {    
    if(intDiffType === 'Swirl'){
		intPhi67 = 0.946;
		if(intGamma > 78.4){
            intPhi4 = 0.8314;
            } else if(intGamma > 7.0){
            	intPhi4 = 0.339 + 0.0122 * intGamma - 0.0000755 * Math.pow(intGamma, 2);
            } else {
            	intPhi4 = 0.4207;
            }
     } else if (intDiffType === 'VAV Directional Int.'){
     	if(intGamma > 9.1){
     		intPhi4 = 0.8700;
     		intPhi67 = 0.9896;
     	    } else if (intGamma > 1.0){
     	    	intPhi4 = 0.1645 * Math.log(intGamma) + 0.5076;
     	    	intPhi67 = 0.0078*intGamma + 0.9186;
     	    } else {
     	    	intPhi4 = 0.5076;
     	    	intPhi67 = 0.9264;
     	    }
     	    }
}

function get_per_phi(perGamma, perDiffType) {
	if(perDiffType == 'VAV Directional Per.'){
		if(perGamma > 15){
			if(blinds == 'down'){
				perPhi4 = 0.8412 - 0.13;
			}else {
				perPhi4 = 0.8412;
			}
			perPhi67 = 0.9722;
			}else if (perGamma > 2.9){
				if(blinds == 'down'){
					perPhi4 = 0.174 * Math.log(perGamma) + 0.37 - 0.13;
				}else{
					perPhi4 = 0.174 * Math.log(perGamma) + 0.37;
				}
				perPhi67 = 0.8075 + 0.0111 * perGamma;
				}else{
					if(blinds == 'down'){
						perPhi4 = 0.5553 - 0.13;
					}else{
						perPhi4 = 0.5553;
					}
					perPhi67 = 0.8379;
					}
				}else if(perDiffType == 'Linear Bar Grille CBE' || perDiffType == 'Linear Bar Grille RP'){
					if(perGamma > 23){
						if(blinds == 'down'){
							perPhi4=1.1798-0.13;
						}else{
							perPhi4=1.1798;
						}
						perPhi67 = 1.297;
					}else if(perGamma >2.7){
						if(blinds == 'down'){
							perPhi4 = 0.18344 + 0.08104 * perGamma - 0.00164 *  Math.pow(perGamma,2) - 0.13;
						}else{
							perPhi4 = 0.18344 + 0.08104 * perGamma - 0.00164 *  Math.pow(perGamma,2);
						}
						perPhi67 = 0.768+0.023 * perGamma;
					 }else{
					 	if(blinds == 'down'){
					 		perPhi4 = 0.3903 - 0.13 ;
					 	}else{
					 		perPhi4 = 0.3903;
					 	}
     	    			perPhi67 = 0.8301;
     	    		}
     	    }
}


 */
function intAvgOZT_calc(intAirflowRate) {
    intAirflowRateM = intAirflowRate * 0.0004719474; // m^3/s
    
    intGamma = Math.pow(intAirflowRateM * intCosDiffAngle,1.5) / 
    (Math.pow((intNumDiffs * intDiffEffArea) / numOccupants, 1.25) * numOccupants * 
    Math.pow((0.0281 * intZF * intCoolingLoadUFADW / 1000),0.5));
    
    get_int_phi(intGamma, intDiffType);
    int4inT = intPhi4 * (intReturnT - intDiffT) + intDiffT;
    int67inT = intPhi67 * (intReturnT - intDiffT) + intDiffT;
    intSetpointT = ((intReturnT - int67inT) / (intRoomHeightIn - 67)) * 
                    (48 - intRoomHeightIn) + intReturnT;
    if (intSetpointT < int4inT) intSetpointT = int4inT;          
    intAvgOZT = ( ((int67inT + intSetpointT) * (67 - 48) / 2) + 
                  ((int4inT + intSetpointT) * (48 - 4) / 2)) / (67 - 4);
                  
    return intAvgOZT
}

function perAvgOZT_calc(perAirflowRate) {
    perAirflowRateM = perAirflowRate * 0.0004719474; // m^3/s
    perGamma = (perAirflowRateM * perCosDiffAngle)/ 
        (perNumDiffs * perDiffEffArea * Math.pow((0.0281 * perZF * perCoolingLoadUFADW) / 
            (1000 * 0.3048 * extWallLength),0.3333333));
    //console.log("perGamma="+perGamma);
    get_per_phi(perGamma, perDiffType);
    per4inT = perPhi4 * (perReturnT - perDiffT) + perDiffT;
    per67inT = perPhi67 * (perReturnT - perDiffT) + perDiffT;
    perSetpointT = ((perReturnT - per67inT) / (perRoomHeightIn - 67)) * 
                    (48 - perRoomHeightIn) + perReturnT;
    if (perSetpointT < per4inT) perSetpointT = per4inT;          
    perAvgOZT = ( ((per67inT + perSetpointT) * (67 - 48) / 2) + 
                  ((per4inT + perSetpointT) * (48 - 4) / 2)) / (67 - 4);

    return perAvgOZT
}

function calc_int_zoneT_indep(intAirflowRate) {
    intDesAirflowRate = intAirflowRate + intFloorArea * intLeakage;
    intSupplyPlenumT = intAhuT;
    intDiffT = intSupplyPlenumT + (3.412 * intSPCoolingLoad) / (1.08 * intDesAirflowRate);
    intReturnT = intDiffT + (3.412 * intZCoolingLoad) / (1.08 * intDesAirflowRate);
    intReturnPlenumT = intReturnT + (3.412 * intRPCoolingLoad) / (1.08 * intDesAirflowRate);

    return intAvgOZT_calc(intAirflowRate);
}

function calc_per_zoneT_indep(perAirflowRate) {
    perDesAirflowRate = perAirflowRate + perFloorArea * perLeakage;
    perSupplyPlenumT = perAhuT;
    perDiffT = perSupplyPlenumT + (3.412 * (perSPCoolingLoad-infloorCap)) / (1.08 * perDesAirflowRate);
    perReturnT = perDiffT + (3.412 * perZCoolingLoad) / (1.08 * perDesAirflowRate);
    perReturnPlenumT = perReturnT + (3.412 * perRPCoolingLoad) / (1.08 * perDesAirflowRate);

    return perAvgOZT_calc(perAirflowRate);
}

function calc_int_zoneT_reverse(intAirflowRate) {
    intDesAirflowRate = intAirflowRate + intFloorArea * intLeakage;
    perDesAirflowRate = perAirflowRate + perFloorArea * perLeakage;
    totDesAirflowRate = intDesAirflowRate + perDesAirflowRate;
    perSupplyPlenumT = perAhuT;
    perDiffT = perSupplyPlenumT + (3.412 * (perSPCoolingLoad-infloorCap)) / (1.08 * totDesAirflowRate);
    intDiffT = perDiffT + (3.412 * intSPCoolingLoad) / (1.08 * intDesAirflowRate);
    intReturnT = intDiffT + (3.412 * intZCoolingLoad) / (1.08 * intDesAirflowRate);
    intReturnPlenumT = intReturnT + (3.412 * intRPCoolingLoad) / (1.08 * intDesAirflowRate);

    return intAvgOZT_calc(intAirflowRate);
}

function calc_per_zoneT_reverse(perAirflowRate) {
    perDesAirflowRate = perAirflowRate + perFloorArea * perLeakage;
    totDesAirflowRate = intDesAirflowRate + perDesAirflowRate;
    perSupplyPlenumT = perAhuT;
    perDiffT = perSupplyPlenumT + (3.412 * (perSPCoolingLoad-infloorCap)) / (1.08 * totDesAirflowRate);
    perReturnT = perDiffT + (3.412 * perZCoolingLoad) / (1.08 * perDesAirflowRate);
    perReturnPlenumT = perReturnT + (3.412 * perRPCoolingLoad) / (1.08 * perDesAirflowRate);

    return perAvgOZT_calc(perAirflowRate);
}

function calc_int_zoneT_series(intAirflowRate) {
    intDesAirflowRate = intAirflowRate + intFloorArea * intLeakage;
    totDesAirflowRate = intDesAirflowRate + perDesAirflowRate;
    intSupplyPlenumT = intAhuT;
    intDiffT = intSupplyPlenumT + (3.412 * intSPCoolingLoad) / (1.08 * totDesAirflowRate);
    intReturnT = intDiffT + (3.412 * intZCoolingLoad) / (1.08 * intDesAirflowRate);
    intReturnPlenumT = intReturnT + (3.412 * intRPCoolingLoad) / (1.08 * intDesAirflowRate);

    return intAvgOZT_calc(intAirflowRate);
}

function calc_per_zoneT_series(perAirflowRate) {
    intDesAirflowRate = intAirflowRate + intFloorArea * intLeakage;
    perDesAirflowRate = perAirflowRate + perFloorArea * perLeakage;
    totDesAirflowRate = intDesAirflowRate + perDesAirflowRate;
    intSupplyPlenumT = intAhuT;
    intDiffT = intSupplyPlenumT + (3.412 * intSPCoolingLoad) / (1.08 * totDesAirflowRate);
    perDiffT = intDiffT + (3.412 * (perSPCoolingLoad-infloorCap)) / (1.08 * perDesAirflowRate);
    perReturnT = perDiffT + (3.412 * perZCoolingLoad) / (1.08 * perDesAirflowRate);
    perReturnPlenumT = perReturnT + (3.412 * perRPCoolingLoad) / (1.08 * perDesAirflowRate);

    return perAvgOZT_calc(perAirflowRate);
}

function calc_int_zoneT_common(intAirflowRate) {
    intDesAirflowRate = intAirflowRate + intFloorArea * intLeakage;
    perDesAirflowRate = perAirflowRate + perFloorArea * perLeakage;
    totDesAirflowRate = intDesAirflowRate + perDesAirflowRate;
    intSupplyPlenumT = intAhuT;
    intDiffT = intSupplyPlenumT + (3.412 * (intSPCoolingLoad + perSPCoolingLoad)) / (1.08 * totDesAirflowRate);
    intReturnT = intDiffT + (3.412 * intZCoolingLoad) / (1.08 * intDesAirflowRate);
    intReturnPlenumT = intReturnT + (3.412 * intRPCoolingLoad) / (1.08 * intDesAirflowRate);

    return intAvgOZT_calc(intAirflowRate);
}

function calc_per_zoneT_common(perAirflowRate) {
    intDesAirflowRate = intAirflowRate + intFloorArea * intLeakage;
    perDesAirflowRate = perAirflowRate + perFloorArea * perLeakage;
    totDesAirflowRate = intDesAirflowRate + perDesAirflowRate;
    intSupplyPlenumT = intAhuT;
    perDiffT = intSupplyPlenumT + (3.412 * (intSPCoolingLoad + perSPCoolingLoad - infloorCap)) / (1.08 * totDesAirflowRate);
    perReturnT = perDiffT + (3.412 * perZCoolingLoad) / (1.08 * perDesAirflowRate);
    perReturnPlenumT = perReturnT + (3.412 * perRPCoolingLoad) / (1.08 * perDesAirflowRate);

    return perAvgOZT_calc(perAirflowRate);
}

function bisect_zoneT(a,b,fn,epsilon,target) {
  if (fn(b) > target){
    alert('Airflow rate greater than 100cfm/sf! Please check the input.'); 
    return false;
    }
  if (fn(a) < target){
    return 0;
  }
  while (Math.abs(b - a) > 2*epsilon) {
    midpoint = (b + a) / 2;
    a_T = fn(a);
    b_T = fn(b);
    midpoint_T = fn(midpoint);
    if ((a_T - target) * (midpoint_T - target) < 0)   
        b = midpoint;
    else if ((b_T - target) * (midpoint_T - target) < 0)
        a = midpoint;
    else
        return 0;
    }
    return midpoint
}

//Adding SI unit system
function toggleUnits(){
	var v;
	IPtoSI = !IPtoSI;
	if (IPtoSI){
		mark = 1;
		$(".tempunit").each(function(){
			$(this).html(' &deg;C');
		});
		$(".tempresult").each(function(){
			v = Util.FtoC($(this).html());
			$(this).html(v.toFixed(1));
		});
		$(".dtempresult").each(function(){
			v = Util.dFtodC($(this).html());
			$(this).html(v.toFixed(1));
		});
		$('input[name="intOccupiedT"],input[name="perOccupiedT"],input[name="intSupplyPlenumT"], input[name="perSupplyPlenumT"]').each(function(){
			v = Util.FtoC($(this).val());
			$(this).val(v.toFixed(1));
		});
		$(".lengthunit").each(function(){
			$(this).html(' m');
		});
		$('input[name="intRoomHeight"],input[name="perRoomHeight"], input[name="extWallLength"]').each(function(){
			v = Util.FttoM($(this).val());
			$(this).val(v.toFixed(1));
		});
		$("#DiffL").html('m');
		$('input[name="barGrilleLength"]').each(function(){
			v = Util.IntoM($(this).val());
			$(this).val(v.toFixed(1));
		});
		$(".areaunit").each(function(){
			$(this).html(' m<sup>2</sup>');
		});
		$('input[name="intFloorArea"], input[name="perFloorArea"]').each(function(){
			v = Util.SftoSm($(this).val());
			$(this).val(v.toFixed(1));
		});		
		$(".loadunit").each(function(){
			$(this).html(' kW');
		});
		$("#DiffL1").each(function(){
			$(this).html(' kW');
		});
		$('input[name="intCoolingLoadMixed"], input[name="perCoolingLoadMixed"], input[name="infloorCap"]').each(function(){
			v = Util.KBtutoKw($(this).val());
			$(this).val(v.toFixed(1));
		});
		$(".speedunit").each(function(){
			$(this).html(' L/s/m<sup>2</sup>');
		});
		$(".speedresult").each(function(){
			v = Util.CfmPtoMps($(this).html());
			$(this).html(v.toFixed(2));
		});
		$('input[name="intLeakage"],input[name="perLeakage"]').each(function(){
			v = Util.CfmPtoMps($(this).val());
			$(this).val(v.toFixed(2));
		});
		$(".airflowunit").each(function(){
			$(this).html(' L/s');
		});
		$(".airflowresult").each(function(){
			v = Util.CfmtoCms($(this).html());
			$(this).html(v.toFixed(0));
		});
		$(".airflowPunit").each(function(){
			$(this).html(' L/s/diff.');
		});
		$(".loaddensityunit").each(function(){
			$(this).html(' W/m<sup>2</sup>');
		});
		$(".loaddensityresult").each(function(){
			v = Util.WpfttoWpm($(this).html());
			$(this).html(v.toFixed(2));
		});
		draw_charts1();
	} else {
		mark = 0;
		$(".tempunit").each(function(){
			$(this).html(' &deg;F');
		});
		$(".tempresult").each(function(){
			v = Util.CtoF($(this).html());
			$(this).html(v.toFixed(1));
		});
		$(".dtempresult").each(function(){
			v = Util.dCtodF($(this).html());
			$(this).html(v.toFixed(1));
		});
		$('input[name="intOccupiedT"],input[name="perOccupiedT"],input[name="intSupplyPlenumT"], input[name="perSupplyPlenumT"]').each(function(){
			v = Util.CtoF($(this).val());
			$(this).val(v.toFixed(1));
		});
		$(".lengthunit").each(function(){
			$(this).html(' ft');
		});
		$('input[name="intRoomHeight"],input[name="perRoomHeight"], input[name="extWallLength"]').each(function(){
			v = Util.MtoFt($(this).val());
			$(this).val(v.toFixed(1));
		});
		$("#DiffL").html('in');
		$('input[name="barGrilleLength"]').each(function(){
			v = Util.MtoIn($(this).val());
			$(this).val(v.toFixed(1));
		});
		$(".areaunit").each(function(){
			$(this).html(' ft<sup>2</sup>');
		});
		$('input[name="intFloorArea"], input[name="perFloorArea"]').each(function(){
			v = Util.SmtoSf($(this).val());
			$(this).val(v.toFixed(1));
		});		
		$(".loadunit").each(function(){
			$(this).html(' kBtu/hr');
		});
		$("#DiffL1").each(function(){
			$(this).html(' kBtu/hr');
		});
		$('input[name="intCoolingLoadMixed"], input[name="perCoolingLoadMixed"], input[name="infloorCap"] ' ).each(function(){
			v = Util.KwtoKBtu($(this).val());
			$(this).val(v.toFixed(1));
		});
		$(".speedunit").each(function(){
			$(this).html(' cfm/ft<sup>2</sup>');
		});
		$(".speedresult").each(function(){
			v = Util.MpstoCfmP($(this).html());
			$(this).html(v.toFixed(2));
		});
		$('input[name="intLeakage"],input[name="perLeakage"]').each(function(){
			v = Util.MpstoCfmP($(this).val());
			$(this).val(v.toFixed(2));
		});
		$(".airflowunit").each(function(){
			$(this).html(' cfm');
		});
		$(".airflowresult").each(function(){
			v = Util.CmstoCfm($(this).html());
			$(this).html(v.toFixed(0));
		});
		$(".airflowPunit").each(function(){
			$(this).html(' cfm/diff.');
		});
		$(".loaddensityunit").each(function(){
			$(this).html(' W/ft<sup>2</sup>');
		});
		$(".loaddensityresult").each(function(){
			v = Util.WpmtoWpf($(this).html());
			$(this).html(v.toFixed(2));
		});
		draw_charts();	
	} console.log("after toggle unitsmark="+mark);
}

function handle_output() {
	var output = {};
	
    // round and display numerical output
    intAirflowPerDiff = intAirflowRateOut / intNumDiffs;
    $("#intAirflowRateOut").html(intAirflowRateOut.toFixed(0));
    $("#intDesAirflowRate").html(intDesAirflowRate.toFixed(0));
    console.log("test="+intdisteff);
    if(intDiffType === 'Swirl' && intAirflowPerDiff < 90 ){
    	$("#intdisteff").html(intdisteff.toFixed(2));
    }else{
    	$("#intdisteff").html('-');
    };
    //$("#intminAirflow").html(intminAirflow.toFixed(0));
    $("#intDiffT").html(intDiffT.toFixed(1));
    $("#int4inT").html(int4inT.toFixed(1));
    $("#intSetpointT").html(intSetpointT.toFixed(1));
    $("#int67inT").html(int67inT.toFixed(1));
    $("#intReturnT").html(intReturnT.toFixed(1));
    $("#intReturnPlenumT").html(intReturnPlenumT.toFixed(1));
    $("#intAvgOZT").html(intAvgOZT.toFixed(1));
    $("#intA1").html((int67inT - int4inT).toFixed(1));
    if(int67inT - int4inT > 7.2) {
        $("#intA1").css("color","red");
    } else {
        $("#intA1").css("color","green");
    }
    $("#intA2").html((intAirflowRateOut / intFloorArea).toFixed(2));
    $("#intA3").html((intAirflowPerDiff).toFixed(0));
    if(intDiffType=='Swirl' && intAirflowPerDiff > 76) {
        $("#intA3").css("color","red");
    } else if(intDiffType=='VAV Directional Int.' && intAirflowPerDiff > 151) {
        $("#intA3").css("color","red");
    } else {
        $("#intA3").css("color","green");
    }
    $("#intA4").html((intDesAirflowRate / intFloorArea).toFixed(2));
    $("#intCoolingLoadMixedW").html(intCoolingLoadMixedW.toFixed(0));
    $("#intUCLR").html(intUCLR.toFixed(2));
    $("#intSPF").html(intSPF.toFixed(2));
    $("#intZF").html(intZF.toFixed(2));
    $("#intRPF").html(intRPF.toFixed(2));
    $("#intCoolingLoadUFADW").html(intCoolingLoadUFADW.toFixed(0));
    $("#intA5").html((intCoolingLoadUFADW / intFloorArea).toFixed(2));
    $("#intSPCoolingLoad").html(intSPCoolingLoad.toFixed(0));
    $("#intA6").html((intSPCoolingLoad / intFloorArea).toFixed(2));
    $("#intZCoolingLoad").html(intZCoolingLoad.toFixed(0));
    $("#intA7").html((intZCoolingLoad / intFloorArea).toFixed(2));
    $("#intRPCoolingLoad").html(intRPCoolingLoad.toFixed(0));
    $("#intA8").html((intRPCoolingLoad / intFloorArea).toFixed(2));

    $("#perAirflowRateOut").html(perAirflowRateOut.toFixed(0));
    $("#perDesAirflowRate").html(perDesAirflowRate.toFixed(0));
    //$("#perdisteff").html(perdisteff.toFixed(2));
    //$("#perminAirflow").html(perminAirflow.toFixed(0));
    $("#perDiffT").html(perDiffT.toFixed(1));
    $("#per4inT").html(per4inT.toFixed(1));
    $("#perSetpointT").html(perSetpointT.toFixed(1));
    $("#per67inT").html(per67inT.toFixed(1));
    $("#perReturnT").html(perReturnT.toFixed(1));
    $("#perReturnPlenumT").html(perReturnPlenumT.toFixed(1));
    $("#perAvgOZT").html(perAvgOZT.toFixed(1));
    $("#perA1").html((per67inT - per4inT).toFixed(1));
    if(per67inT - per4inT > 7.2) {
        $("#perA1").css("color","red");
    } else {
        $("#perA1").css("color","green");
    }
    $("#perA2").html((perAirflowRateOut / perFloorArea).toFixed(2));
    perAirflowPerDiff = perAirflowRateOut / perNumDiffs;
    $("#perA3").html((perAirflowPerDiff).toFixed(0));
    if(perDiffType=='Linear Bar Grille CBE' && perAirflowPerDiff > 246 * (0.0254 * barGrilleLength)) {
        $("#perA3").css("color","red");
    } else if(perDiffType=='Linear Bar Grille RP' && perAirflowPerDiff > 490 * (0.0254 * barGrilleLength)){
    	$("#perA3").css("color","red");
    }else if(perDiffType=='VAV Directional Per.' && perAirflowPerDiff > 151) {
        $("#perA3").css("color","red");
    } else {
        $("#perA3").css("color","green");
    }
    $("#perA4").html((perDesAirflowRate / perFloorArea).toFixed(2));
    $("#perCoolingLoadMixedW").html(perCoolingLoadMixedW.toFixed(0));
    $("#perUCLR").html(perUCLR.toFixed(2));
    $("#perSPF").html(perSPF.toFixed(2));
    $("#perZF").html(perZF.toFixed(2));
    $("#perRPF").html(perRPF.toFixed(2));
    $("#perCoolingLoadUFADW").html(perCoolingLoadUFADW.toFixed(0));
    $("#perA5").html((perCoolingLoadUFADW / perFloorArea).toFixed(2));
    $("#perSPCoolingLoad").html(perSPCoolingLoad.toFixed(0));
    $("#perA6").html((perSPCoolingLoad / perFloorArea).toFixed(2));
    $("#perZCoolingLoad").html(perZCoolingLoad.toFixed(0));
    $("#perA7").html((perZCoolingLoad / perFloorArea).toFixed(2));
    $("#perRPCoolingLoad").html(perRPCoolingLoad.toFixed(0));
    $("#perA8").html((perRPCoolingLoad / perFloorArea).toFixed(2));
}
//create a jasn object to contain the visulaization data

function draw_charts() {

    if(plenumConfig == "Common Plenum" || plenumConfig == "Series") perSupplyPlenumT = intDiffT;
    if(plenumConfig == "Reverse Series") intSupplyPlenumT = perDiffT; 
  
    var indata = [
          {
          	Point : 1.0,
          	Temperature : Math.round(intSupplyPlenumT*10)/10 ,
          	Height : -10.0
          },
          {
          	Point : 2.0,
          	Temperature : Math.round(intDiffT*10)/10,
          	Height : -10.0
          },
          {
          	Point : 3.0,
          	Temperature : (Math.round(intDiffT*10)/10) ,
          	Height: 0.0
          },
          {
          	Point : 4.0,
          	Temperature : Math.round(int4inT*10)/10,
          	Height: 4.0
          },
          {
          	Point : 5.0,
          	Temperature : Math.round(intAvgOZT*10)/10,
          	Height: 35.5
          },
          {
          	Point : 6.0,
          	Temperature : Math.round(intSetpointT*10)/10,
          	Height: 48.0
          },
          {
          	Point : 7.0,
          	Temperature : Math.round(int67inT*10)/10,
          	Height: 67.0
          },
          {
          	Point : 8.0, 
          	Temperature : Math.round(intReturnT*10)/10,
          	Height: Math.round(intRoomHeightIn*10)/10
          }
];
/*
var indata = [
          {
          	Point : 1.1,
          	Temperature : 63.1 ,
          	Height : -10.1
          },
          {
          	Point : 2.1,
          	Temperature : 66.1,
          	Height : -10.1
          },
          {
          	Point : 3.1,
          	Temperature : 66.1 ,
          	Height: 0.1
          },
          {
          	Point : 4.1,
          	Temperature : 72.1,
          	Height: 4.1
          },
          {
          	Point : 5.1,
          	Temperature : 75.1,
          	Height: 36.1
          },
          {
          	Point : 6.1,
          	Temperature : 76.1,
          	Height: 48.1
          },
          {
          	Point : 7.1,
          	Temperature : 76.1,
          	Height: 67.1
          },
          {
          	Point : 8.1, 
          	Temperature : 77.1,
          	Height: 107.1
          }
];
*/
    var pedata = [
          {
          	Point : 1,
          	Temperature : Math.round(perSupplyPlenumT*10)/10,
          	Height : -10
          },
          {
          	Point : 2,
          	Temperature : Math.round(perDiffT*10)/10,
          	Height : -10
          },
          {
          	Point : 3,
          	Temperature : (Math.round(perDiffT*10)/10),
          	Height: 0
          }	,
          {
          	Point : 4,
          	Temperature : Math.round(per4inT*10)/10,
          	Height: 4
          }	,
          {
          	Point : 5,
          	Temperature : Math.round(perAvgOZT*10)/10,
          	Height: 35.5
          }	,
          {
          	Point : 6,
          	Temperature : Math.round(perSetpointT*10)/10,
          	Height: 48
          }	,
          {
          	Point : 7,
          	Temperature : Math.round(per67inT*10)/10 ,
          	Height: 67
          }	,
          {
          	Point : 8,
          	Temperature : Math.round(perReturnT*10)/10,
          	Height: Math.round(perRoomHeightIn*10)/10
          }	,
];

    
    $("#draw_chart1").empty();
    $("#draw_chart2").empty();
    $("#draw_chart1").append("<h3>Interior Zone</h3>");
    var svg1 = dimple.newSvg("#draw_chart1", 480,500)
    var myChart1 = new dimple.chart(svg1,indata);
    myChart1.setBounds(60, 30, 400, 430);
    var x1 = myChart1.addMeasureAxis("x", "Temperature");
    x1.title = "Temperature (°F)";
    //x1.tickFormat = ".1f";
    var y1 = myChart1.addMeasureAxis("y","Height");
    y1.title = "Height (.in)";
    //y1.tickFormat = ".1f";
    myChart1.addColorAxis("Temperature",["blue","yellow","red"]);
    //myChart1.addColorAxis("Point","grey")
    
    var s1 = myChart1.addSeries("Point",dimple.plot.line);
    s1.addOrderRule("Point");
    myChart1.addSeries(["Temperature","Height"],dimple.plot.bubble);
    s1.lineWeight = 3;
    x1.overrideMin = 55;
    x1.overrideMax = 80;
    y1.overrideMax = 110;    
    myChart1.draw();
   
    $("#draw_chart2").append("<h3>Perimeter Zone</h3>");
    var svg2 = dimple.newSvg("#draw_chart2", 480,500)
    var myChart2 = new dimple.chart(svg2,pedata);
    myChart2.setBounds(60, 30, 400, 430);
    //x2.tickFormat = ".1f";
    var x2 = myChart2.addMeasureAxis("x", "Temperature");
    var y2 = myChart2.addMeasureAxis("y","Height");
    //y2.addOrderRule("Point");
    //x2.addOrderRule("Point");
    //var y2 = myChart2.addAxis("y","Height","Height");
    myChart2.addColorAxis("Temperature",["blue","yellow","red"]);
    console.log("test the result"+perPhi4);
    var s2 = myChart2.addSeries("Point",dimple.plot.line);
    s2.addOrderRule("Point");
    //s2.aggregate = dimple.aggregateMethod.avg;
    s2.lineWeight = 3;    
    myChart2.addSeries(["Temperature","Height"],dimple.plot.bubble);
    x2.overrideMin = 55;
    x2.overrideMax = 80;
    y2.overrideMax = 110;
    x2.title = "Temperature (°F)";
    y2.title = "Height (.in)";
    myChart2.draw();    
}

function draw_charts1() {

    if(plenumConfig == "Common Plenum" || plenumConfig == "Series") perSupplyPlenumT = intDiffT;
    if(plenumConfig == "Reverse Series") intSupplyPlenumT = perDiffT; 
    
    var indata = [
          {
          	Point : 1,
          	Temperature : Math.round(Util.FtoC(intSupplyPlenumT)*10)/10 ,
          	Height : -0.25
          },
          {
          	Point : 2,
          	Temperature : Math.round(Util.FtoC(intDiffT)*10)/10,
          	Height : -0.25
          },
          {
          	Point : 3,
          	Temperature : (Math.round(Util.FtoC(intDiffT)*10)/10) ,
          	Height: 0
          },
          {
          	Point : 4,
          	Temperature : Math.round(Util.FtoC(int4inT)*10)/10,
          	Height: 0.1
          },
          {
          	Point : 5,
          	Temperature : Math.round(Util.FtoC(intAvgOZT)*10)/10,
          	Height: 0.9
          },
          {
          	Point : 6,
          	Temperature : Math.round(Util.FtoC(intSetpointT)*10)/10,
          	Height: 1.2
          },
          {
          	Point : 7,
          	Temperature : Math.round(Util.FtoC(int67inT)*10)/10,
          	Height: 1.7
          },
          {
          	Point : 8, 
          	Temperature : Math.round(Util.FtoC(intReturnT)*10)/10,
          	Height: Math.round(Util.IntoM(intRoomHeightIn)*10)/10
          }
];
console.log(indata);

    var pedata = [
          {
          	Point : 1,
          	Temperature : Math.round(Util.FtoC(perSupplyPlenumT)*10)/10,
          	Height : -0.25
          },
          {
          	Point : 2,
          	Temperature : Math.round(Util.FtoC(perDiffT)*10)/10,
          	Height : -0.25
          },
          {
          	Point : 3,
          	Temperature : (Math.round(Util.FtoC(perDiffT)*10)/10),
          	Height: 0
          }	,
          {
          	Point : 4,
          	Temperature : Math.round(Util.FtoC(per4inT)*10)/10,
          	Height: 0.1
          }	,
          {
          	Point : 5,
          	Temperature : Math.round(Util.FtoC(perAvgOZT)*10)/10,
          	Height: 0.9
          }	,
          {
          	Point : 6,
          	Temperature : Math.round(Util.FtoC(perSetpointT)*10)/10,
          	Height: 1.2
          }	,
          {
          	Point : 7,
          	Temperature : Math.round(Util.FtoC(per67inT)*10)/10 ,
          	Height: 1.7
          }	,
          {
          	Point : 8,
          	Temperature : Math.round(Util.FtoC(perReturnT)*10)/10,
          	Height: Math.round(Util.IntoM(perRoomHeightIn)*10)/10
          }	,
];

    
    $("#draw_chart1").empty();
    $("#draw_chart2").empty();
    $("#draw_chart1").append("<h3>Interior Zone</h3>");
    var svg1 = dimple.newSvg("#draw_chart1", 480,500)
    var myChart1 = new dimple.chart(svg1,indata);
    myChart1.setBounds(60, 30, 400, 430);
    var x1 = myChart1.addMeasureAxis("x", "Temperature");
    x1.title = "Temperature (°C)";
    //x1.tickFormat = ".1f";
    var y1 = myChart1.addMeasureAxis("y","Height");
    y1.title = "Height (m)";
    myChart1.addColorAxis("Temperature",["blue","yellow","red"]);
    myChart1.addColorAxis("Point","grey")
    
    var s1 = myChart1.addSeries("Point",dimple.plot.line);
    s1.addOrderRule("Point");
    myChart1.addSeries(["Temperature","Height"],dimple.plot.bubble);
    s1.lineWeight = 3;
    x1.overrideMin = 12.8;
    x1.overrideMax = 26.7;
    y1.overrideMax = 2.8;    
    myChart1.draw();
   
    $("#draw_chart2").append("<h3>Perimeter Zone</h3>");
    var svg2 = dimple.newSvg("#draw_chart2", 480,500)
    var myChart2 = new dimple.chart(svg2,pedata);
    myChart2.setBounds(60, 30, 400, 430);
    //x2.tickFormat = ".1f";
    var x2 = myChart2.addMeasureAxis("x", "Temperature");
    var y2 = myChart2.addMeasureAxis("y","Height");
    //y2.addOrderRule("Point");
    //x2.addOrderRule("Point");
    //var y2 = myChart2.addAxis("y","Height","Height");
    myChart2.addColorAxis("Temperature",["blue","yellow","red"]);
    console.log("test the result"+perPhi4);
    var s2 = myChart2.addSeries("Point",dimple.plot.line);
    s2.addOrderRule("Point");
    //s2.aggregate = dimple.aggregateMethod.avg;
    s2.lineWeight = 3;    
    myChart2.addSeries(["Temperature","Height"],dimple.plot.bubble);
    x2.overrideMin = 12.8;
    x2.overrideMax = 26.7;
    y2.overrideMax = 2.8;
    x2.title = "Temperature (°C)";
    y2.title = "Height (m)";
    myChart2.draw();    
}


function main() {
	console.log("before caculation mark=="+mark);
	if(mark == 1){
		toggleUnits();
		console.log("newmark"+mark);
	var input = document.forms['input'];
    var intdisteff;
    var perdisteff;
    plenumConfig = input.plenumConfig.value;
    
    intRoomHeight = parseFloat(input.intRoomHeight.value);
    intFloorArea  = parseFloat(input.intFloorArea.value);
    intFloorLevel = input.intFloorLevel.value;
    intDiffType = $('#intDiffType').data('ddslick').selectedData.value;
    intNumDiffs = parseFloat(input.intNumDiffs.value);
    intCoolingLoadMixed = parseFloat(input.intCoolingLoadMixed.value);
    intOccupiedT = parseFloat(input.intOccupiedT.value);
    intLeakage = parseFloat(input.intLeakage.value);
    intAhuT = parseFloat(input.intSupplyPlenumT.value);

    perRoomHeight = parseFloat(input.perRoomHeight.value);
    perFloorArea  = parseFloat(input.perFloorArea.value);
    perFloorLevel = input.perFloorLevel.value;
    perDiffType = $('#perDiffType').data('ddslick').selectedData.value;
    barGrilleLength = input.barGrilleLength.value;
    infloorCap = input.infloorCap.value;
    perNumDiffs = parseFloat(input.perNumDiffs.value);
    perCoolingLoadMixed = parseFloat(input.perCoolingLoadMixed.value);
    perOccupiedT = parseFloat(input.perOccupiedT.value);
    perLeakage = parseFloat(input.perLeakage.value);
    perAhuT = parseFloat(input.perSupplyPlenumT.value);

    numOccupants = parseFloat(input.numOccupants.value);
    blinds = input.blinds.value;
    zoneOrientation = input.zoneOrientation.value;
    extWallLength = parseFloat(input.extWallLength.value);
    
    errorsFound = validate_input();
    
    loadUnit = 'kbtu/hr' 

    intRoomHeightIn = intRoomHeight * 12;
    perRoomHeightIn = perRoomHeight * 12;
    intUCLR = 0.9528;
    perUCLR = 0.9528;
    intSPF  = 0.6179;
    perSPF  = intSPF - 0.2095;

    // load splits, UCLR
    if (intFloorLevel == 'Ground Floor'){
        intUCLR = intUCLR + 0.0802;
        intSPF  = Math.pow(intSPF,2);
        intRPF  = 0.01;
        intZF   = 1 - intSPF - intRPF;
    }else if (intFloorLevel == 'Middle Floor'){
        intUCLR = intUCLR + 0.1572 + 0.0802;
        intSPF  = Math.pow(intSPF + 0.1242,2);
        intRPF  = 0.01;
        intZF   = 1 - intSPF - intRPF;
        perUCLR = perUCLR + 0.1572;
        perSPF  = perSPF + 0.1242;
    }else if (intFloorLevel == 'Top Floor'){
        intUCLR = intUCLR + 0.2379 + 0.0802;
        intSPF = Math.pow(intSPF - 0.0896,2);
        intRPF = 0.3;
        intZF  = 1 - intSPF - intRPF;
        perSPF  = perSPF - 0.0896;
        perUCLR = perUCLR + 0.2379;
    }
    
    if (perFloorLevel == 'Ground Floor'){
        perSPF  = Math.pow(perSPF,2);
        perRPF  = 0.01;
        perZF   = 1 - perSPF - perRPF;    
    }else if (perFloorLevel == 'Middle Floor'){
        perSPF  = Math.pow(perSPF + 0.0396,2);
        perRPF  = 0.01;
        perZF   = 1 - perSPF - perRPF;    
    }else if (perFloorLevel == 'Top Floor'){
        perSPF  = Math.pow(perSPF + 0.1642,2);
        perRPF  = 0.30;
        perZF   = 1 - perSPF - perRPF;    
    }

    if (zoneOrientation == 'East'){
        perUCLR = perUCLR + 0.1739;
    }else if (zoneOrientation == 'South'){
        perUCLR = perUCLR + 0.0999;
    }else if (zoneOrientation == 'West'){
        perUCLR = perUCLR + 0.1349;
    }
    
    // diffuser data
    if(intDiffType == 'Swirl'){
        intDiffAngle = 28;
        intDiffEffArea = 0.0075;
    }else if(intDiffType == 'VAV Directional Int.'){
        intDiffAngle = 45;
        intDiffEffArea = 0.035; 
    }
    
    intCosDiffAngle = Math.cos(intDiffAngle * Math.PI / 180);
    
    if(perDiffType == 'VAV Directional Per.'){
        perDiffAngle = 45;
        perDiffEffArea = 0.035; 
    }else if(perDiffType == 'Linear Bar Grille CBE'){
        perDiffAngle = 15;
        perDiffEffArea = barGrilleLength * 0.0254 * 0.0548;//unit is m2(0.0548 m2/m)
    }else if(perDiffType == 'Linear Bar Grille RP'){
    	perDiffAngle = 15;
    	perDiffEffArea = 0.0240;//unit is m2
    }
    
    perCosDiffAngle = Math.cos(perDiffAngle * Math.PI / 180);
    
    // loads
    if (loadUnit == 'kbtu/hr'){
        intCoolingLoadMixedW = intCoolingLoadMixed * 0.2928104 * 1000;
    }else{
        intCoolingLoadMixedW = intCoolingLoadMixed * 0.2928104 * intFloorArea;
    }   
    intCoolingLoadUFADW = intCoolingLoadMixedW * intUCLR;
    intSPCoolingLoad = intCoolingLoadUFADW * intSPF;
    intZCoolingLoad = intCoolingLoadUFADW * intZF;
    intRPCoolingLoad = intCoolingLoadUFADW * intRPF;
    
    if (loadUnit == 'kbtu/hr'){
        perCoolingLoadMixedW = perCoolingLoadMixed * 0.2928104 * 1000;
        infloorCap = infloorCap * 0.2928104 * 1000;
    }else{
        perCoolingLoadMixedW = perCoolingLoadMixed * 0.2928104 * perFloorArea;
        infloorCap = infloorCap * 0.2928104 * perFloorArea;
    }
    perCoolingLoadUFADW = perCoolingLoadMixedW * perUCLR;
    perSPCoolingLoad = perCoolingLoadUFADW * perSPF;
    perZCoolingLoad = perCoolingLoadUFADW * perZF;
    perRPCoolingLoad = perCoolingLoadUFADW * perRPF;
    
    // Choose solver function here
    if(plenumConfig == "Independent Plenums"){
        // Independent zones solver
        intAirflowRateOut = bisect_zoneT(0.001,100*intFloorArea,calc_int_zoneT_indep,0.0001,intOccupiedT);
        if(intAirflowRateOut == 0) intAvgOZT = calc_int_zoneT_indep(0);
        if(intAirflowRateOut == false) return true;
        perAirflowRateOut = bisect_zoneT(0.001,100*perFloorArea,calc_per_zoneT_indep,0.0001,perOccupiedT);
        if(perAirflowRateOut == 0) perAvgOZT = calc_per_zoneT_indep(0);
        if(perAirflowRateOut == false) return true;
    } else if(plenumConfig == "Reverse Series"){
        // Reverse Series solver
        perAirflowRate = 50*perFloorArea;
        for (i=1;i<10;i++){
            intAirflowRateOut = bisect_zoneT(0.001,100*intFloorArea,calc_int_zoneT_reverse,0.0001,intOccupiedT);
            if(intAirflowRateOut == false) return true;
            if(intAirflowRateOut == 0) intAvgOZT = calc_int_zoneT_reverse(0);
            perAirflowRateOut = bisect_zoneT(0.001,100*perFloorArea,calc_per_zoneT_reverse,0.0001,perOccupiedT);
            if(perAirflowRateOut == false) return true;
            if(perAirflowRateOut == 0) perAvgOZT = calc_per_zoneT_reverse(0);
            perAirflowRate = perAirflowRateOut;
        }
    } else if(plenumConfig == "Series"){
        // Series solver
        intAirflowRate = 50*intFloorArea;
        for (i=1;i<10;i++){
            perAirflowRateOut = bisect_zoneT(0.001,100*perFloorArea,calc_per_zoneT_series,0.0001,perOccupiedT);
            if(perAirflowRateOut == false) return true;
            if(perAirflowRateOut == 0) perAvgOZT = calc_per_zoneT_series(0);
            intAirflowRateOut = bisect_zoneT(0.001,100*intFloorArea,calc_int_zoneT_series,0.0001,intOccupiedT);
            if(intAirflowRateOut == false) return true;
            if(intAirflowRateOut == 0) intAvgOZT = calc_int_zoneT_series(0);
            intAirflowRate = intAirflowRateOut;
        }
    } else if(plenumConfig == "Common Plenum"){
        // Common solver
        intAirflowRate = 50*intFloorArea;
        perAirflowRate = 50*perFloorArea;
        for (i=1;i<10;i++){
            intAirflowRateOut = bisect_zoneT(0.001,100*intFloorArea,calc_int_zoneT_common,0.0001,intOccupiedT);
            intAirflowRate = intAirflowRateOut;
            if(intAirflowRateOut == false) return true;
            if(intAirflowRateOut == 0) intAvgOZT = calc_int_zoneT_common(0);
            perAirflowRateOut = bisect_zoneT(0.001,100*perFloorArea,calc_per_zoneT_common,0.0001,perOccupiedT);
            perAirflowRate = perAirflowRateOut;
            if(perAirflowRateOut == false) return true;
            if(perAirflowRateOut == 0) perAvgOZT = calc_per_zoneT_common(0);
        }
    }
    console.log("intDesAirflowRate="+intDesAirflowRate);
    intDistEff();
    perDistEff();
    
    console.log("intGamma = "+intGamma);
    console.log("intPhi4="+intPhi4);
    console.log("intPhi67="+intPhi67);
    console.log("perGamma = "+perGamma);
    console.log("perPhi4="+perPhi4);
    console.log("perPhi67="+perPhi67);
    //console.log("perSetpointT="+perSetpointT);
    //console.log("per67inT="+per67inT);
    //console.log("perReturnT="+perReturnT);


   if(perPhi4 > 1.05 || perPhi67 > 1.05){
   	    toggleUnits();
    	x=confirm("The design conditions that you have entered into the tool may result in reverse stratification in the perimeter zone. This means that the linear bar grilles will blow cooler air up to the ceiling and could have a negative energy and indoor air quality impact. To avoid this situation, we suggest to increase the number of diffusers and/or if possible, reduce the perimeter zone cooling load.\n\nTo run the design tool calculations with your original input parameters, click <OK>\nTo cancel the calculations and return to the input screen, click <Cancel>");
    	if(x == true){
    		toggleUnits();
    		handle_output();
    		toggleUnits();
    		draw_charts1();}
    }else{
    	
    	handle_output();
    	toggleUnits();
    	draw_charts1();
    }
   }else{
   	var input = document.forms['input'];
    var intdisteff;
    var perdisteff;
    plenumConfig = input.plenumConfig.value;
    
    intRoomHeight = parseFloat(input.intRoomHeight.value);
    intFloorArea  = parseFloat(input.intFloorArea.value);
    intFloorLevel = input.intFloorLevel.value;
    intDiffType = $('#intDiffType').data('ddslick').selectedData.value;
    intNumDiffs = parseFloat(input.intNumDiffs.value);
    intCoolingLoadMixed = parseFloat(input.intCoolingLoadMixed.value);
    intOccupiedT = parseFloat(input.intOccupiedT.value);
    intLeakage = parseFloat(input.intLeakage.value);
    intAhuT = parseFloat(input.intSupplyPlenumT.value);

    perRoomHeight = parseFloat(input.perRoomHeight.value);
    perFloorArea  = parseFloat(input.perFloorArea.value);
    perFloorLevel = input.perFloorLevel.value;
    perDiffType = $('#perDiffType').data('ddslick').selectedData.value;
    barGrilleLength = input.barGrilleLength.value;
    infloorCap = input.infloorCap.value;
    perNumDiffs = parseFloat(input.perNumDiffs.value);
    perCoolingLoadMixed = parseFloat(input.perCoolingLoadMixed.value);
    perOccupiedT = parseFloat(input.perOccupiedT.value);
    perLeakage = parseFloat(input.perLeakage.value);
    perAhuT = parseFloat(input.perSupplyPlenumT.value);

    numOccupants = parseFloat(input.numOccupants.value);
    blinds = input.blinds.value;
    zoneOrientation = input.zoneOrientation.value;
    extWallLength = parseFloat(input.extWallLength.value);
    
    errorsFound = validate_input();
    
    loadUnit = 'kbtu/hr' 

    intRoomHeightIn = intRoomHeight * 12;
    perRoomHeightIn = perRoomHeight * 12;
    intUCLR = 0.9528;
    perUCLR = 0.9528;
    intSPF  = 0.6179;
    perSPF  = intSPF - 0.2095;

    // load splits, UCLR
    if (intFloorLevel == 'Ground Floor'){
        intUCLR = intUCLR + 0.0802;
        intSPF  = Math.pow(intSPF,2);
        intRPF  = 0.01;
        intZF   = 1 - intSPF - intRPF;
    }else if (intFloorLevel == 'Middle Floor'){
        intUCLR = intUCLR + 0.1572 + 0.0802;
        intSPF  = Math.pow(intSPF + 0.1242,2);
        intRPF  = 0.01;
        intZF   = 1 - intSPF - intRPF;
        perUCLR = perUCLR + 0.1572;
        perSPF  = perSPF + 0.1242;
    }else if (intFloorLevel == 'Top Floor'){
        intUCLR = intUCLR + 0.2379 + 0.0802;
        intSPF = Math.pow(intSPF - 0.0896,2);
        intRPF = 0.3;
        intZF  = 1 - intSPF - intRPF;
        perSPF  = perSPF - 0.0896;
        perUCLR = perUCLR + 0.2379;
    }
    
    if (perFloorLevel == 'Ground Floor'){
        perSPF  = Math.pow(perSPF,2);
        perRPF  = 0.01;
        perZF   = 1 - perSPF - perRPF;    
    }else if (perFloorLevel == 'Middle Floor'){
        perSPF  = Math.pow(perSPF + 0.0396,2);
        perRPF  = 0.01;
        perZF   = 1 - perSPF - perRPF;    
    }else if (perFloorLevel == 'Top Floor'){
        perSPF  = Math.pow(perSPF + 0.1642,2);
        perRPF  = 0.30;
        perZF   = 1 - perSPF - perRPF;    
    }

    if (zoneOrientation == 'East'){
        perUCLR = perUCLR + 0.1739;
    }else if (zoneOrientation == 'South'){
        perUCLR = perUCLR + 0.0999;
    }else if (zoneOrientation == 'West'){
        perUCLR = perUCLR + 0.1349;
    }
    
    // diffuser data
    if(intDiffType == 'Swirl'){
        intDiffAngle = 28;
        intDiffEffArea = 0.0075;
    }else if(intDiffType == 'VAV Directional Int.'){
        intDiffAngle = 45;
        intDiffEffArea = 0.035; 
    }
    
    intCosDiffAngle = Math.cos(intDiffAngle * Math.PI / 180);
    
    if(perDiffType == 'VAV Directional Per.'){
        perDiffAngle = 45;
        perDiffEffArea = 0.035; 
    }else if(perDiffType == 'Linear Bar Grille CBE'){
        perDiffAngle = 15;
        perDiffEffArea = barGrilleLength * 0.0254 * 0.0548;//unit is m2(0.0548 m2/m)
    }else if(perDiffType == 'Linear Bar Grille RP'){
    	perDiffAngle = 15;
    	perDiffEffArea = 0.0240;//unit is m2
    }
    
    perCosDiffAngle = Math.cos(perDiffAngle * Math.PI / 180);
    
    // loads
    if (loadUnit == 'kbtu/hr'){
        intCoolingLoadMixedW = intCoolingLoadMixed * 0.2928104 * 1000;
    }else{
        intCoolingLoadMixedW = intCoolingLoadMixed * 0.2928104 * intFloorArea;
    }   
    intCoolingLoadUFADW = intCoolingLoadMixedW * intUCLR;
    intSPCoolingLoad = intCoolingLoadUFADW * intSPF;
    intZCoolingLoad = intCoolingLoadUFADW * intZF;
    intRPCoolingLoad = intCoolingLoadUFADW * intRPF;
    
    if (loadUnit == 'kbtu/hr'){
        perCoolingLoadMixedW = perCoolingLoadMixed * 0.2928104 * 1000;
        infloorCap = infloorCap * 0.2928104 * 1000;
    }else{
        perCoolingLoadMixedW = perCoolingLoadMixed * 0.2928104 * perFloorArea;
        infloorCap = infloorCap * 0.2928104 * perFloorArea;
    }
    perCoolingLoadUFADW = perCoolingLoadMixedW * perUCLR;
    perSPCoolingLoad = perCoolingLoadUFADW * perSPF;
    perZCoolingLoad = perCoolingLoadUFADW * perZF;
    perRPCoolingLoad = perCoolingLoadUFADW * perRPF;
    
    // Choose solver function here
    if(plenumConfig == "Independent Plenums"){
        // Independent zones solver
        intAirflowRateOut = bisect_zoneT(0.001,100*intFloorArea,calc_int_zoneT_indep,0.0001,intOccupiedT);
        if(intAirflowRateOut == 0) intAvgOZT = calc_int_zoneT_indep(0);
        if(intAirflowRateOut == false) return true;
        perAirflowRateOut = bisect_zoneT(0.001,100*perFloorArea,calc_per_zoneT_indep,0.0001,perOccupiedT);
        if(perAirflowRateOut == 0) perAvgOZT = calc_per_zoneT_indep(0);
        if(perAirflowRateOut == false) return true;
    } else if(plenumConfig == "Reverse Series"){
        // Reverse Series solver
        perAirflowRate = 50*perFloorArea;
        for (i=1;i<10;i++){
            intAirflowRateOut = bisect_zoneT(0.001,100*intFloorArea,calc_int_zoneT_reverse,0.0001,intOccupiedT);
            if(intAirflowRateOut == false) return true;
            if(intAirflowRateOut == 0) intAvgOZT = calc_int_zoneT_reverse(0);
            perAirflowRateOut = bisect_zoneT(0.001,100*perFloorArea,calc_per_zoneT_reverse,0.0001,perOccupiedT);
            if(perAirflowRateOut == false) return true;
            if(perAirflowRateOut == 0) perAvgOZT = calc_per_zoneT_reverse(0);
            perAirflowRate = perAirflowRateOut;
        }
    } else if(plenumConfig == "Series"){
        // Series solver
        intAirflowRate = 50*intFloorArea;
        for (i=1;i<10;i++){
            perAirflowRateOut = bisect_zoneT(0.001,100*perFloorArea,calc_per_zoneT_series,0.0001,perOccupiedT);
            if(perAirflowRateOut == false) return true;
            if(perAirflowRateOut == 0) perAvgOZT = calc_per_zoneT_series(0);
            intAirflowRateOut = bisect_zoneT(0.001,100*intFloorArea,calc_int_zoneT_series,0.0001,intOccupiedT);
            if(intAirflowRateOut == false) return true;
            if(intAirflowRateOut == 0) intAvgOZT = calc_int_zoneT_series(0);
            intAirflowRate = intAirflowRateOut;
        }
    } else if(plenumConfig == "Common Plenum"){
        // Common solver
        intAirflowRate = 50*intFloorArea;
        perAirflowRate = 50*perFloorArea;
        for (i=1;i<10;i++){
            intAirflowRateOut = bisect_zoneT(0.001,100*intFloorArea,calc_int_zoneT_common,0.0001,intOccupiedT);
            intAirflowRate = intAirflowRateOut;
            if(intAirflowRateOut == false) return true;
            if(intAirflowRateOut == 0) intAvgOZT = calc_int_zoneT_common(0);
            perAirflowRateOut = bisect_zoneT(0.001,100*perFloorArea,calc_per_zoneT_common,0.0001,perOccupiedT);
            perAirflowRate = perAirflowRateOut;
            if(perAirflowRateOut == false) return true;
            if(perAirflowRateOut == 0) perAvgOZT = calc_per_zoneT_common(0);
        }
    }
    console.log("intDesAirflowRate="+intDesAirflowRate);
    intDistEff();
    perDistEff();
    
    console.log("intGamma = "+intGamma);
    console.log("intPhi4="+intPhi4);
    console.log("intPhi67="+intPhi67);
    console.log("perGamma = "+perGamma);
    console.log("perPhi4="+perPhi4);
    console.log("perPhi67="+perPhi67);
    //console.log("perSetpointT="+perSetpointT);
    //console.log("per67inT="+per67inT);
    //console.log("perReturnT="+perReturnT);

   if(perPhi4 > 1.05 || perPhi67 > 1.05){
    	x=confirm("The design conditions that you have entered into the tool may result in reverse stratification in the perimeter zone. This means that the linear bar grilles will blow cooler air up to the ceiling and could have a negative energy and indoor air quality impact. To avoid this situation, we suggest to increase the number of diffusers and/or if possible, reduce the perimeter zone cooling load.\n\nTo run the design tool calculations with your original input parameters, click <OK>\nTo cancel the calculations and return to the input screen, click <Cancel>");
    	if(x == true){handle_output();draw_charts();}
    }else{
    	handle_output();draw_charts();
    }
   }
}

//dropdown menu for diffusers

var intDiff = [
	{
		text: "Swirl",
        value: 'Swirl',
        selected: false,
        description: "Normally used in interior zone.",
        imageSrc: "img/Diffuser_Swirl.JPG"
	},
	{
		text: "VAV directional",
        value: 'VAV Directional Int.',
        selected: false,
        description: "VAV Directional Diffuser for interior zone",
        imageSrc: "img/Diffuser_Square.JPG"
	}
];

var perDiff = [
	{
		text: "VAV directional",
        value: 'VAV Directional Per.',
        selected: false,
        description: "VAV Directional Diffuser for perimeter zone",
        imageSrc: "img/Diffuser_Square.JPG"
	},
	{
		text: "Linear Bar Grille #1",
        value: 'Linear Bar Grille CBE',
        selected: false,
        description: "Walnut CLEMIT-3-27-06-015-L6F: <br> (User specified length) ft x 6 in.",
        imageSrc: "img/CBE_Linear.JPG"
	},
	{
		text: "Linear Bar Grille #2",
        value: 'Linear Bar Grille RP',
        selected: false,
        description: "Price Linear Bar Grille(LFG-F): <br>16 in. x 8 in.",
        imageSrc: "img/Diffuser_Linear_Rp.JPG"
	}
];

//Air Distribution Effectiveness
function intDistEff(){
	console.log("start to calculate the intdisseff");
	
	Vr = intDesAirflowRate * 0.000472;
	Qrm = intZCoolingLoad;
	Af = intFloorArea * 0.0929;
	Ts = Util.FtoC(intDiffT);
	H = intRoomHeight * 0.3048;
	n = intNumDiffs;
		
	intdisteff = 1.9 + 0.9252 * Vr * Qrm / (Af * Af) + 37.8 * Vr * Ts / (Af * H) + 103.68 * Vr * Vr * Ts / (Af * H * n) - 1288.8 * Vr / (Af * H) - 3240 * Vr * Vr / (Af * H * n) + 0.00591 * Qrm / Af;
	console.log("intdisseff ="+intdisteff);
}

function perDistEff(){
	Vr = perDesAirflowRate * 0.000472;
	Qrm = perZCoolingLoad;
	Af = perFloorArea * 0.0929;
	Ts = Util.FtoC(perDiffT);
	H = perRoomHeight * 0.3048;
	n = perNumDiffs;
	
	/*
	Vr = 0.108;
	Qrm = 1530;
	Af = 20.16;
	Ts = 16.5;
	H = 2.4;
	n = 3;
	*/
	
	perdisteff = 1.9 + 0.9252 * Vr * Qrm / (Af * Af) + 37.8 * Vr * Ts / (Af * H) + 103.68 * Vr * Vr * Ts / (Af * H * n) - 1288.8 * Vr / (Af * H) - 3240 * Vr * Vr / (Af * H * n) + 0.00591 * Qrm / Af;

	console.log("the caculated perdisteff = "+perdisteff);
}
