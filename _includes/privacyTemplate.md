# Cookie and Privacy Policy

This policy informs of our use of cookies and similar technologies and how and for what purposes we collect and process your personal information.

If you find content on {{ site.privacy.name }} website, that you believe violates our Privacy Policy, please contact us immediately at {{ site.privacy.contactEmail }}.

etc etc.

{% if site.siteMeasurements.enable %}
Revoking consent of tracking cookies can be in the privacy policy:

<!-- The conditional is to ensure that we only show it if tracking is enabled -->
<div style="margin: 12px 0">
  <button class="button is-primary" onclick="resetPrivacySettings()">
    Revoke consent
  </button>
</div>
{% endif %}

The privacy template can use the following variables to simplify use:

* `site.privacy.name`: {{ site.privacy.name }}
* `site.privacy.domain`: {{ site.privacy.domain }}
* `site.privacy.contactEmail`: {{ site.privacy.contactEmail }}
* `site.privacy.helpdeskEmail`: {{ site.privacy.helpdeskEmail }}

The are configured in `_config.yml` as
```yml
privacy:
  name: GBIF
  domain: gbif.org
  contactEmail: info@gbif.org
  helpdeskEmail: helpdesk@gbif.org
```
