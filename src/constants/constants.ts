export enum ErrorMessages {
	userNotFound = 'User not found',
	notValidUUID = 'Not valid UUID',
}
export const UUID_PATTERN = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/;
export const ROUTE_WITH_USER_ID_PATTERN = /\/api\/users\/(.)/;
