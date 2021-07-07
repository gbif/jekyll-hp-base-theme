# Privacy Policy

{% if site.siteMeasurements.enable %}
<!-- The conditional is to ensure that we only show it if tracking is enabled -->
<div style="margin: 12px 0">
  <button class="button is-primary" onclick="resetPrivacySettings()">
    Reset settings
  </button>
</div>
{% endif %}

The privacy template needs to be filled in. The following variables are available

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