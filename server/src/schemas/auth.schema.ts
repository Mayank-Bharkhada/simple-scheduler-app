import { z } from "zod";

export const signUpSchema = z.object({
    email: z.string({
        invalid_type_error: "Email Must be string.",
        required_error: "Email is required."
    }).email({ message: 'Invalid email address' }),
    password: z.string({
        invalid_type_error: "Password Must be string.",
        required_error: "Password is required."
    }),
    name: z.string({
        invalid_type_error: "Name Must be string.",
        required_error: "Name is required."
    })
}); 

export const signInSchema = z.object({
    email: z.string({
        invalid_type_error: "Email Must be string.",
        required_error: "Email is required."
    }).email({ message: 'Invalid email address' }),
    password: z.string({
        invalid_type_error: "Password Must be string.",
        required_error: "Password is required."
    })
});