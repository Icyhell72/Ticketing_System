

from rest_framework import permissions

class RoleBasedPermission(permissions.BasePermission):
    """
    Strict Role-Based Permissions:
    - User: Can ONLY Create (POST). Cannot List or Retrieve.
    - Admin: Can List, Retrieve, Update. Cannot Create.
    """
    def has_permission(self, request, view):

        if not request.user or not request.user.is_authenticated:
            return False


        if request.user.is_staff:

            if view.action == 'create':
                return False

            return True



        if view.action in ['create', 'list', 'retrieve']:
            return True
            

        return False

    def has_object_permission(self, request, view, obj):

        if request.user.is_staff:
            return True


        return obj.createdBy == request.user