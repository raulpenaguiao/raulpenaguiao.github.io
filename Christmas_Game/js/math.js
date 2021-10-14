/* computes a poisson random variable
*/

/*inv_rate is the expected value of the poisson random variable*/
/*Max is the maximal value that this distribution takes*/
function poisson(inv_rate, randomUniform, max){
	var compare, curr_sum = 1, curr_index = 0, term=1;
	compare = Math.exp(inv_rate) * randomUniform;
	while(curr_sum <= compare && curr_index < max){
		curr_index += 1;
		term *= inv_rate;
		term /= curr_index;
		curr_sum += term;
	}
	return curr_index;
}


function zero_inflated_poisson(inv_rate, randomUniform, zero_prob){
	if (randomUniform  < zero_prob ) return 0;
	return 1 + poisson(inv_rate/(1-zero_prob), (randomUniform - zero_prob)/(1 - zero_prob),  3 * inv_rate);
}