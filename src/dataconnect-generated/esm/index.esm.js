import {
	queryRef,
	executeQuery,
	validateArgsWithOptions,
	validateArgs,
	makeMemoryCacheProvider,
} from "firebase/data-connect";

export const connectorConfig = {
	connector: "example",
	service: "skild-6c3cf-service",
	location: "europe-west3",
};
export const dataConnectSettings = {
	cacheSettings: {
		cacheProvider: makeMemoryCacheProvider(),
	},
};
export const getSkillsRef = (dcOrVars, vars) => {
	const { dc: dcInstance, vars: inputVars } = validateArgs(
		connectorConfig,
		dcOrVars,
		vars,
	);
	dcInstance._useGeneratedSdk();
	return queryRef(dcInstance, "GetSkills", inputVars);
};
getSkillsRef.operationName = "GetSkills";

/**
 * Execute the GetSkills query and return its result.
 * @param {(object|string|undefined)} dcOrVars - Data Connect instance or variables for the query; if a Data Connect instance is provided, variables should be passed via subsequent parameters.
 * @param {(object|object[]|undefined)} varsOrOptions - Variables for the query or an options object when `dcOrVars` is a Data Connect instance.
 * @param {object|undefined} options - Optional execution options (e.g., fetchPolicy) when `dcOrVars` is a Data Connect instance.
 * @returns {any} The result of the GetSkills query.
 */
export function getSkills(dcOrVars, varsOrOptions, options) {
	const {
		dc: dcInstance,
		vars: inputVars,
		options: inputOpts,
	} = validateArgsWithOptions(
		connectorConfig,
		dcOrVars,
		varsOrOptions,
		options,
		true,
		false,
	);
	return executeQuery(
		getSkillsRef(dcInstance, inputVars),
		inputOpts && inputOpts.fetchPolicy,
	);
}
