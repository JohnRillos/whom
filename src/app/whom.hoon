/-  *whom
/+  default-agent, dbug, verb, whom-fields
|%
::
+$  card  card:agent:gall
::
+$  versioned-state
  $%  state-0
  ==
::
+$  state-0
  $:  %0
      contacts=(map (each @p @t) contact)
      fields=(map @tas field-def)
      next-id=@ud
  ==
--
::
=|  state-0
=*  state  -
::
%-  agent:dbug
%+  verb  |
^-  agent:gall
=<
|_  =bowl:gall
+*  this     .
    default  ~(. (default-agent this %|) bowl)
    main     ~(. +> bowl)
::
++  on-init
  ^-  (quip card _this)
  =.  state  *state-0
  =.  fields  default-fields:whom-fields
  [~ this]
::
++  on-save  !>(state)
::
++  on-load
  |=  old-vase=vase
  ^-  (quip card _this)
  |^
  =|  cards=(list card)
  ?:  %.y  (reset-state cards) :: (for testing only)
  =+  !<(old=versioned-state old-vase)
  |-
  ?-  -.old
    %0  [cards this(state old)]
  ==
  ::
  ++  reset-state
    |=  cards=(list card)
    =/  new-state  *state-0
    =/  default-fields  default-fields:whom-fields
    [cards this(state new-state(fields default-fields))]
  --
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  |^
  ?+    mark  (on-poke:default mark vase)
      %noun
    ?+    q.vase  (on-poke:default mark vase)
        %print-state
      ~&  >>  state  [~ this]
        %print-bowl
      ~&  >>>  bowl  [~ this]
    ==
    ::
      %whom-action
    ~&  >  %whom-action
    =^  cards  state
      (handle-action !<(action vase))
    [cards this]
  ==
  ::
  ++  handle-action
    |=  act=action
    ^-  (quip card _state)
    ?-    -.act
      ::
        %add-contact
      ?>  (is-contact-valid:main contact.act)
      =/  key=(each @p @t)
        ?~  ship.act  [%.n (scot %ud next-id)]
        ~|  'You cannot add yourself as a contact. Try creating a profile instead!'
          ?<  =(our.bowl u.ship.act)
        [%.y u.ship.act]
      ~|  "{<p.key>} already exists in contacts!"  ?<  (~(has by contacts) key)
      =.  next-id  +(next-id)
      =.  contacts  (~(put by contacts) key contact.act)
      [[give-update:main ~] state]
      ::
        %del-contact
      =.  contacts  (~(del by contacts) key.act)
      [[give-update:main ~] state]
      ::
        %edit-contact
      =/  contact  (~(got by contacts) key.act)
      =.  info.contact  (edit-info-map info.act info.contact)
      =.  contacts  (~(put by contacts) key.act contact)
      [[give-update:main ~] state]
      ::
        %add-field
      ~|  "Field {<key.act>} already exists!"
        ?<  (~(has by fields) key.act)
      =.  fields  (~(put by fields) key.act def.act)
      [[give-fields:main ~] state]
      ::
        %del-field
      =/  count=@ud
        %-  ~(rep by contacts)
        |=  [entry=[* =contact] acc=@ud]
        ?:  (~(has by info.contact.entry) key.act)  +(acc)
        acc
      ?:  =(count 1)
        ~|("Cannot delete field {<key.act>}: Still in use by 1 contact!" !!)
      ?:  (gth count 1)
        ~|("Cannot delete field {<key.act>}: Still in use by {<count>} contacts!" !!)
      =.  fields  (~(del by fields) key.act)
      [[give-fields:main ~] state]
    ==
  ::
  ++  edit-info-map
    |=  [changes=(map @tas (unit info-field)) old=(map @tas info-field)]
    ^+  old
    %-  ~(rep by changes)
    |=  [change=[@tas (unit info-field)] acc=_old]
    (~(mar by acc) change)
  ::
  ++  random-id
    ^-  @t
    (scot %uvj eny.bowl)
  --
::
++  on-arvo   on-arvo:default
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?>  (team:title our.bowl src.bowl)
  ?+  path  (on-watch:default path)
    [%updates ~]  [[give-update:main ~] this]
    [%settings %fields ~]  [[give-fields:main ~] this]
  ==
::
++  on-leave  on-leave:default
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+  path  (on-peek:default path)
    [%x %contacts ~]  ``whom-contacts-0+!>(contacts)
    [%x %settings %fields ~]  ``whom-fields-0+!>(field-list:field-util:main)
  ==
::
++  on-agent  on-agent:default
++  on-fail   on-fail:default
--
|_  =bowl:gall
::
++  give-update
  ^-  card
  =/  =update  contacts
  [%give %fact [/updates]~ %whom-update !>(update)]
::
++  give-fields
  ^-  card
  =/  =fields-0  field-list:field-util
  [%give %fact [/settings/fields]~ %whom-fields-0 !>(fields-0)]
::
++  is-contact-valid
  |=  =contact
  =/  info=(list [@tas info-field])  ~(tap by info.contact)
  (levy info is-field-valid)
::
++  is-field-valid
  |=  field=[key=@tas val=info-field]
  ?:  (is-valid:field-util field)  %.y
  ~&  >>>  "Invalid field: {<field>}"  %.n
::
++  field-util  ~(. field-util:whom-fields fields)
--