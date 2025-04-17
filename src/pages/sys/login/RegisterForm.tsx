import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";

import userService from "@/api/services/userService";
import { useUserActions } from "@/store/userStore";
import { toast } from "sonner";

import { ReturnButton } from "./components/ReturnButton";
import { LoginStateEnum, useLoginStateContext } from "./providers/LoginStateProvider";

function RegisterForm() {
	const { t } = useTranslation();
	const { setUserToken, setUserInfo } = useUserActions();
	const signUpMutation = useMutation({
		mutationFn: userService.signup,
	});

	const { loginState, backToLogin } = useLoginStateContext();
	if (loginState !== LoginStateEnum.REGISTER) return null;

	const onFinish = async (values: any) => {
		try {
			console.log("Received values of form: ", values);
			const res = await signUpMutation.mutateAsync(values);
			console.log("Sign up response:", res);

			// Store the tokens and user info
			setUserToken({
				accessToken: res.access_token,
				refreshToken: res.refresh_token,
			});
			setUserInfo(res.user);

			toast.success(t("sys.login.registerSuccess"));
			backToLogin(); // Return to login page after successful registration
		} catch (err) {
			console.error("Sign up error:", err);
			toast.error(err.message || t("sys.login.registerFailed"), {
				position: "top-center",
			});
		}
	};

	return (
		<>
			<div className="mb-4 text-2xl font-bold xl:text-3xl">{t("sys.login.signUpFormTitle")}</div>
			<Form name="normal_login" size="large" initialValues={{ remember: true }} onFinish={onFinish}>
				<Form.Item name="username" rules={[{ required: true, message: t("sys.login.accountPlaceholder") }]}>
					<Input placeholder={t("sys.login.userName")} />
				</Form.Item>
				<Form.Item name="email" rules={[{ required: true, message: t("sys.login.emaildPlaceholder") }]}>
					<Input placeholder={t("sys.login.email")} />
				</Form.Item>
				<Form.Item name="password" rules={[{ required: true, message: t("sys.login.passwordPlaceholder") }]}>
					<Input.Password type="password" placeholder={t("sys.login.password")} />
				</Form.Item>
				<Form.Item
					name="confirmPassword"
					rules={[
						{
							required: true,
							message: t("sys.login.confirmPasswordPlaceholder"),
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue("password") === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error(t("sys.login.diffPwd")));
							},
						}),
					]}
				>
					<Input.Password type="password" placeholder={t("sys.login.confirmPassword")} />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" className="w-full" loading={signUpMutation.isPending}>
						{t("sys.login.registerButton")}
					</Button>
				</Form.Item>

				<div className="mb-2 text-xs text-gray">
					<span>{t("sys.login.registerAndAgree")}</span>
					<a href="./" className="text-sm !underline">
						{t("sys.login.termsOfService")}
					</a>
					{" & "}
					<a href="./" className="text-sm !underline">
						{t("sys.login.privacyPolicy")}
					</a>
				</div>

				<ReturnButton onClick={backToLogin} />
			</Form>
		</>
	);
}

export default RegisterForm;
