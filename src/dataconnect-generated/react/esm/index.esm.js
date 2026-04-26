import { getSkillsRef, connectorConfig } from "../../esm/index.esm.js";
import { CallerSdkTypeEnum } from "firebase/data-connect";
import {
	useDataConnectQuery,
	validateReactArgs,
} from "@tanstack-query-firebase/react/data-connect";

/**
 * Create and run a React Data Connect query hook to fetch "skills".
 *
 * Normalizes the provided arguments, constructs the skills Data Connect reference, and returns the hook result.
 *
 * @param {any} dcOrVars - Either a Data Connect instance or the variables object when no instance is provided.
 * @param {any} [varsOrOptions] - When `dcOrVars` is an instance: the variables object; otherwise the react-query options.
 * @param {any} [options] - React Query options used when `dcOrVars` is a Data Connect instance.
 * @returns {object} The React Query hook result for the skills query.
export function useGetSkills(dcOrVars, varsOrOptions, options) {
	const {
		dc: dcInstance,
		vars: inputVars,
		options: inputOpts,
	} = validateReactArgs(
		connectorConfig,
		dcOrVars,
		varsOrOptions,
		options,
		true,
		false,
	);
	const ref = getSkillsRef(dcInstance, inputVars);
	return useDataConnectQuery(ref, inputOpts, CallerSdkTypeEnum.GeneratedReact);
}
