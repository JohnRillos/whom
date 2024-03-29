/-  zer=storage-0
|%
++  past
  |%
  ++  zero  zer
  --
+$  credentials
  $:  endpoint=@t
      access-key-id=@t
      secret-access-key=@t
  ==
::
+$  configuration
  $:  buckets=(set @t)
      current-bucket=@t
      region=@t
  ==
::
+$  action
  $%  [%set-endpoint endpoint=@t]
      [%set-access-key-id access-key-id=@t]
      [%set-secret-access-key secret-access-key=@t]
      [%add-bucket bucket=@t]
      [%remove-bucket bucket=@t]
      [%set-current-bucket bucket=@t]
      [%set-region region=@t]
  ==
::
+$  update
  $%  [%credentials =credentials]
      [%configuration =configuration]
      action
  ==
--
