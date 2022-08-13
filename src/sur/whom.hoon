|%
+$  contact
  $:  ship=(unit @p)
      info=(map @tas contact-field)
      custom=(map @t @t)
  ==
::
+$  action
  $%  [%add-contact =contact]
      [%del-contact key=(each @p @t)]
  ==
::
+$  update
  $:  urbit-contacts=(map @p contact)
      earth-contacts=(map @t contact)
  ==
::
+$  contact-field-def
  $%  [%first-name @t]
      [%middle-name @t]
      [%last-name @t]
      [%nickname @t]
      [%note @t]
      [%dob local-date]
      [%job @t]
      [%email @t]
      [%phone @t]
      [%website @t]
      [%github @t]
  ==
::
+$  contact-field
  $%  @t
      local-date
  ==
::
+$  local-date
  $:  %date
      year=@ud
      month=@ud
      day=@ud
  ==
::
++  validate-contact
  |=  =contact
  ^-  ?
  =/  info=(list [@tas contact-field])  ~(tap by info.contact)
  (levy info validate-info-field)
::
++  validate-info-field
  |=  field=[@tas contact-field]
  ?:  ?=(contact-field-def field)  %.y
  ~&  >>>  "Invalid info field: {<field>}"  %.n
--
