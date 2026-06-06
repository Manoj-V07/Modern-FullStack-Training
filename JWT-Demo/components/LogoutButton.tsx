import logout from "@/app/actions/logout"

function LogoutButton() {
    return (
        <form action={logout}>
            <button>
                Logout
            </button>
        </form>
    )
}

export default LogoutButton;