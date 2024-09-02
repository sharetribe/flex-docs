---
title: User access control
slug: user-access-control-in-sharetribe
updated: 2024-08-23
category: concepts-users-and-authentication
ingress:
  This article explains what types of user access control are available
  in a Sharetribe marketplace
published: true
---

By default, all users in a Sharetribe marketplace have the same
permissions to join, post listings, and start transactions. However, you
can modify some of these permissions in Console, under the "Access
control" tab.

![Access control options](./access_control_blank.png)

Access control features can be toggled on or off on the marketplace
level, and some permissions can also be modified per user. Certain
access control settings may also enforce authorization in certain API
endpoints.

When an operator makes a user-level change to a single user's
permissions, it triggers a _user/updated_ event that you can listen to
with Integration API. However, when an operator toggles a feature on or
off on the marketplace level, no event is triggered, even though the
effective permissions may change for some users.

## Make marketplace private

By default, Sharetribe marketplaces are public. This means that listings
and user profiles are visible to unauthenticated users. By making your
marketplace private, you allow only authenticated users to view listings
and users on your marketplace.

On a private marketplace, the only public Marketplace API endpoints are
user creation and password reset related. All other endpoints require an
authenticated user access token.

This setting can be turned on or off on the marketplace level.

![Access control for private marketplace](./access_control_private_marketplace.png)

## Approve users who want to join

User approval means that when a user signs up, they need to be approved
by an admin before they have full access to the marketplace.

On **public marketplaces**, this means that users pending approval can
view listings and other users' profiles, but they cannot post listings
or initiate transactions.

On **private marketplaces**, users pending approval can only view their
own profile – they cannot view any other marketplace data.

You can enable this setting in the Access Control tab.

![Access control for user approval](./access_control_user_approval.png)

When this setting is enabled, you will see a badge next to the name of
each user who is pending operator approval.

![Multiple users pending approval](./access_control_pending_users.png)

You can accept the user by opening their user detail card and clicking
on the "Approve user" button in the bottom right corner of your screen.

![Accept user pending approval](./access_control_pending_user.png)

## Manually grant permission to publish listings

You might also want to limit listing publishing rights to certain users
only. For example, if you have user types "Buyer" and "Seller", you
might want to grant listing publishing rights to sellers only. Or you
might be monetizing your marketplace with subscriptions, and therefore
you only want to grant publishing rights to users who have subscribed.

On the marketplace level, you can toggle the selection in the Access
control tab.

![Publish listings permission checkbox](./access_control_publishing_permission.png)

Once this checkbox is selected, you can see the permission status of
each user in the Console's Manage > Users view. A checkmark indicates
permission to post, a cross indicates that the user does not have
permissions to post listings.

![User permissions in Manage view](./users_view_permissions.png)

You can grant or revoke publishing rights for an individual user in
their user details. Click the "Edit" link next to the "Permissions"
heading.

![Edit a single user's permissions](./edit_user_permissions.png)

Now, you can check or uncheck the permissions checkbox for this user.

![User permissions checkbox](./user_publish_listings_checkbox.png)

## Permissions in the access-control.json asset

On the marketplace level, the changes made in Console get recorded in
the asset _/general/access-control.json_.

![/general/access-control.json asset](./access-control-asset.png)

## Permissions in the currentUser resource

Permissions show up in the _currentUser_ resource in two ways:

- _currentUser_ has an attribute _permissions_, which contains the
  user-level permission setting

![currentUser.attributes.permissions](./current_user_permissions_attribute.png)

- _currentUser_ also has a related resource _effectivePermissionSet_,
  which contains the user's permissions based on the user level and
  marketplace level settings. You will need to explicitly
  [include this related resource](https://www.sharetribe.com/api-reference/#including-related-resources)
  in your _currentUser.show()_ API call to fetch it from the API.

![currentUser.relationships.effectivePermissionsSet](./current_user_effectivePermissionSet.png)

This is an important distinction, because the
_currentUser.attributes.permissions_ value might be different from the
_effectivePermissionSet_ value.

For this reason, you should always use the _effectivePermissionSet_
value to determine the user's access in custom code, because it takes
into account both user-level and marketplace-level permissions.

Consider this example:

- A marketplace has enforced manual permission to publish listings
- User A has had their publishing rights revoked. Both their
  _attributes.permission_ value and their _effectivePermissionSet_ value
  for _postListings_ are _"permission/deny"_.
- Marketplace operator has a campaign where they want to grant all users
  posting rights for 24 hours, and they deselect the checkbox for
  requiring manual permission to publish listings.

Now, the _attributes.permission_ value for _postListings_ is still
_"permission/deny"_, because it persists on the user's profile.

![currentUser.attributes.permissions](./current_user_permissions_attribute.png)

The _effectivePermissionSet_ value for _postListings_, however, is
_"permission/allow"_, because now the marketplace level restriction has
been lifted. The marketplace level setting overrides the user level
setting.

![currentUser.relationships.effectivePermissionsSet with marketplace level permission](./current_user_effectivePermissionSet_allow.png)
