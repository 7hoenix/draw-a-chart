var regression = require("regression");
var mylessons = {'poly': [['polynomial', 0], ['polynomial', 1], ['polynomial', 2], ['polynomial', 3]], 
'exp': [['exponential', 2], ['polynomial', 1]]};

function Analyze(data) {
	var lesson = 'poly';
	var modelsToTry = mylessons[lesson];
	var models = [];
	var rsq = [];

	//regress and compute rsq for all the models in modelsToTry
	for(var i=0; i< modelsToTry.length; i++){
		var currentModel = regression(modelsToTry[i][0], data, modelsToTry[i][1]);
		rsq.push(computeRSq(data, currentModel.points, modelsToTry[i][1]));
		models.push(currentModel);
	}

	//get the model with the lowest rsq
	var highestInd = rsq.indexOf(Math.max.apply(null, rsq));
	var model = models[highestInd];
	
	//interpret model
	console.log(interpretModel(modelsToTry[highestInd], model.equation));
	return interpretModel(modelsToTry[highestInd], model.equation);
}

function interpretModel(modelType, modelEquation){
	var penFactor = modelType[1];
	if (penFactor == 0){
		return('The graph you drew looks constant. It is neither increasing nor decreasing.');
	}

	var leadingCoeff = modelEquation[penFactor];

	if (penFactor == 1){
		if (leadingCoeff < 0){
			return('The graph you drew looks linear. You think that as x increases, y increases too.');
		}
		else{
			return('The graph you drew looks linear. You think that as x increases, y decreases.');
		}
	}

	if (penFactor == 2){
		if (leadingCoeff < 0){
			return('The graph you drew looks quadratic and concave up. That means it has a minimum somewhere.');
		}
		else{
			return('The graph you drew looks quadratic and concave down. That means it has a maximum somewhere.');
		}
	}

	if (penFactor == 3){
		return('The graph you drew is quite complicated.');
	}
}

function computeRSq(data, modelPoints, penFactor) {

	//compute average of y values
	var n = data.length;
	var ybar = 0;
	for( var j = 0; j < data.length; j++){
		ybar += data[j][1];
	}
	ybar = ybar/n;

	//compute RSS and TSS
	var rss = 0;
	var tss = 0;
	for( var j = 0; j < data.length; j++){
		var y = data[j][1];
		var yhat = modelPoints[j][1];
		rss += Math.pow(2,y-yhat);
		tss += Math.pow(2,y-ybar);
	}

	//compute (penalized = adjusted) R-squared
	if(n-penFactor-1 <= 0){
		console.log('Not enough points given to penalize with a factor of ' + String(penFactor));
		var rsquared = 0;
	}
	else{
		var rsquared = 1 - rss/tss;
	}
	console.log('rsq = ' + String(rsquared));
	return(rsquared);
	
}

module.exports = Analyze;

