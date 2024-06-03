window.privacyConsentGiven = {
  allCookies: false,
  functionalCookies: false,
  targetingCookies: false,
  performanceCookies: false
};
window.fedsConfig = window.fedsConfig || {};
window.fedsConfig.privacy = window.fedsConfig.privacy || {};
window.fedsConfig.privacy.otDomainId = "7a5eb705-95ed-4cc4-a11d-0cc5760e93db";

function createAndDispatchEvent(eventName) {
  window.dispatchEvent(new Event(eventName));
}

function checkConsent() {
  var activeGroups = window.adobePrivacy && window.adobePrivacy.activeCookieGroups();
  if (activeGroups) {
      if (activeGroups.indexOf("C0002") === -1) {
          window.privacyConsentGiven.performanceCookies = false;
      } else {
          window.privacyConsentGiven.performanceCookies = true;
          createAndDispatchEvent("adobePrivacy:PerformanceCookies");
      }
      if (activeGroups.indexOf("C0003") === -1) {
          window.privacyConsentGiven.functionalCookies = false;
      } else {
          window.privacyConsentGiven.functionalCookies = true;
          createAndDispatchEvent("adobePrivacy:FunctionalCookies");
      }
      if (activeGroups.indexOf("C0004") === -1) {
          window.privacyConsentGiven.targetingCookies = false;
      } else {
          window.privacyConsentGiven.targetingCookies = true;
          createAndDispatchEvent("adobePrivacy:TargetingCookies");
          if (!window.newRelicLoaded) {
              var newRelicScript = document.createElement("script");
              newRelicScript.type = "text/javascript";
              newRelicScript.onload = function() {
                  window.newRelicLoaded = true;
                  if (window.newRelicLoadedCallback) {
                      window.newRelicLoadedCallback();
                  }
              };
              newRelicScript.src = "/static/new-relic-6010f20f86d729edfa54cf36565f9e2051e2eb01.js";
              document.body.appendChild(newRelicScript);
          }
      }
  }
}



window.addEventListener("adobePrivacy:PrivacyConsent", checkConsent);
window.addEventListener("adobePrivacy:PrivacyCustom", checkConsent);
window.addEventListener("adobePrivacy:PrivacyReject", checkConsent);

