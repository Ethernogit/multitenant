const tenants = {
    "bether_gold.com": "bether_gold",
    "tallerchris.com": "tallerchris"
  };
  
  async function getTenantDatabase(email) {
    const domain = email.split("@")[1]; 
    return tenants[domain] || null;
  }