namespace Logic.Enums
{
    public enum AuthenticateResultType
    {
        UserDoesNotExists = 0,
        PasswordDoesNotMatch = 1,
        UserIsLockedOut = 2,
        UserIsDeleted = 3,
        Success = 4,
        UnknownError = 5

    }
}