|%
+$  contact
  $:  info=(map @tas info-field)
      profile=(unit profile)
  ==
::
+$  self
  $:  info=(map @tas info-field)
      :: todo: access levels
  ==
::
+$  profile
  $:  info=(map @tas info-field)
      fields=(map @tas field-def)
  ==
::
+$  action
  $%  [%add-contact ship=(unit @p) =contact]
      [%del-contact key=(each @p @t)]
      [%mod-contact-info key=(each @p @t) info=(map @tas (unit info-field))]
      [%mod-contact-ship key=(each @p @t) ship=(unit @p)]
      [%add-field key=@tas def=field-def]
      [%del-field key=@tas]
      [%mod-self info=(map @tas (unit info-field))]
      [%pal-sync enabled=?]
      [%hey-pal =ship]
      [%bye-pal =ship]
  ==
::
+$  field-def  [name=@t type=field-type-tag]
::
+$  field-type-tag  ?(%text %date)
::
+$  info-field
  $%  [%text @t]
      [%date @da]
  ==
::
+$  pals-info
  $:  running=?
      pals=(map @p pal)
  ==
::
+$  pal
  $:  status=?(%leeche %target %mutual)
  ==
::
+$  contacts-0  (map (each @p @t) contact)
::
+$  fields-0  (list [@tas field-def])
::
+$  self-0  self
::
+$  profile-0  profile
::
+$  pals-0  pals-info
--
