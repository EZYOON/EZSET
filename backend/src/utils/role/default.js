export function setDefaultRole(roles) {
    roles
        .default()

        .resource('profile')
        .canOwn('read')

        .resource('role')
        .canOwn('read')

        .resource('board')
        .can('read')
}

export function setAdminRole(roles) {
    roles
        .role('admin')

        .resource('profile')
        .can(['read', 'update'])

        .resource('role')
        .can(['read', 'create', 'delete', 'update'])

        .resource('board')
        .can(['read', 'create', 'delete'])
}
