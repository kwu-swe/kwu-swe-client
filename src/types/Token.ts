export interface TokenSign {
	accessToken: string;
	code_expire: string;
	grantType: "Bearer";
	refreshToken: string;
	refresh_expire: string;
}