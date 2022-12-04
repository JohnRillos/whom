|%
+$  contact
  $:  info=(map @tas info-field)
      profile=(unit profile)
  ==
::
+$  self
  $:  info=(map @tas [value=info-field access=access-level])
  ==
::
+$  access-level  ?(%public %mutual)
::
+$  profile
  $:  info=(map @tas [value=info-field access=access-level])
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
      [%mod-self info=(map @tas (unit [val=info-field level=access-level]))]
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
+$  pal  status=?(%leeche %target %mutual)
::
+$  contact-0
  $:  info=(map @tas info-field)
      profile=(unit profile-0)
  ==
::
+$  contact-1  contact
::
++  contact-0-to-1 :: todo: move helper methods into library
  |=  =contact-0
  :-  info.contact-0
  ?~  profile.contact-0  ~
  `(profile-0-to-1 u.profile.contact-0)
::
++  contact-1-to-0
  |=  =contact-1
  :-  info.contact-1
  ?~  profile.contact-1  ~
  `(profile-1-to-0 u.profile.contact-1)
::
+$  contacts-0  (map (each @p @t) contact-0)
::
+$  contacts-1  (map (each @p @t) contact-1)
::
++  contacts-1-to-0
  |=  =contacts-1
  ^-  contacts-0
  %-  ~(run by contacts-1)
  contact-1-to-0
::
+$  fields-0  (list [@tas field-def])
::
+$  self-0  info=(map @tas info-field)
::
+$  self-1  self
::
+$  profile-0
  $:  info=(map @tas info-field)
      fields=(map @tas field-def)
  ==
::
+$  profile-1  profile
::
++  profile-0-to-1
  |=  =profile-0
  ^-  profile-1
  %=  profile-0
    info  %-  ~(run by info.profile-0)
          |=  =info-field
          [info-field %public]
  ==
::
++  profile-1-to-0
  |=  =profile-1
  ^-  profile-0
  %=  profile-1
    info  %-  ~(run by info.profile-1)
          |=  [=info-field *]
          info-field
  ==
::
+$  pals-0  pals-info
--
