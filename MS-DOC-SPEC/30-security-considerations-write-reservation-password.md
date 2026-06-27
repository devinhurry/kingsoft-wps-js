# Security Considerations

## Write Reservation Password

The [**write-reservation
password**](#gt_eb7d2c26-ca89-46e7-b552-f341f18076c9) is embedded in
cleartext in the file. Be aware that protection with a write reservation
password is not considered a security mechanism. The protection can be
easily removed by using a binary editor. Protection with a
write-reservation password is meant to protect against accidental
modification only.
