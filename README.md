latch-client-gateway
	provides authentication and authorization, user interface content and a facade/proxy for secure access to back-end API services.

# Environment Configuration

## Available Configuration Variables:
	SERVER_PORT		Port that the service application runs on(default: 80/443)
	SPRING_PROFILES_ACTIVE	Comma separated list of active Profile names. Used to activate profile 									specific code	*see below*
	
## SPRING_PROFILES_ACTIVE valid values:

###	localdev
	exposes a local https end-point on port 443 using a self-signed certificate.
"# trp" 
