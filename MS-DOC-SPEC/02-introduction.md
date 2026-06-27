# Introduction

This document specifies the Word Binary File Format (.doc) Structure,
which defines the Word Binary File Format (.doc). The Word Binary File
Format is a collection of records and structures that specify text,
tables, fields, pictures, embedded XML markup, and other document
content. The content can be printed on pages of multiple sizes or
displayed on a variety of devices.

The Word Binary File Format begins with a master record named the File
Information Block, which references all other data in the file. By
following links from the File Information Block, an application can
locate all text and other objects in the file and compute the properties
of those objects.

Sections 1.7 and 2 of this specification are normative. All other
sections and examples in this specification are informative.
