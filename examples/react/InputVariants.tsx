import { useState } from "react";
import {
  LoongArkInputRoot,
  LoongArkInputControl,
  LoongArkInputLabel,
  LoongArkInputPrefix,
  LoongArkInputSuffix,
  LoongArkInputHelperText,
  LoongArkPinInput,
} from "@loongark/react";

export function InputVariantsExample() {
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        maxWidth: "400px",
      }}
    >
      <h3>基础 Input（无装饰）</h3>
      <LoongArkInputRoot>
        <LoongArkInputLabel>用户名</LoongArkInputLabel>
        <LoongArkInputControl placeholder="请输入用户名" />
      </LoongArkInputRoot>

      <h3>带 Prefix 的 Input</h3>
      <LoongArkInputRoot>
        <LoongArkInputLabel>搜索</LoongArkInputLabel>
        <LoongArkInputPrefix>🔍</LoongArkInputPrefix>
        <LoongArkInputControl
          placeholder="搜索内容"
          value={search}
          onChange={(e: { target: { value: string } }) =>
            setSearch(e.target.value)
          }
        />
      </LoongArkInputRoot>

      <h3>带可选 Clear Suffix 的 Input</h3>
      <LoongArkInputRoot>
        <LoongArkInputLabel>邮箱</LoongArkInputLabel>
        <LoongArkInputControl
          placeholder="your@email.com"
          value={email}
          onChange={(e: { target: { value: string } }) =>
            setEmail(e.target.value)
          }
        />
        {email && (
          <LoongArkInputSuffix action="clear" onClick={() => setEmail("")}>
            ✕
          </LoongArkInputSuffix>
        )}
        <LoongArkInputHelperText>请输入有效的邮箱地址</LoongArkInputHelperText>
      </LoongArkInputRoot>

      <h3>带 Prefix 和 Suffix 的 Input</h3>
      <LoongArkInputRoot>
        <LoongArkInputLabel>金额</LoongArkInputLabel>
        <LoongArkInputPrefix>¥</LoongArkInputPrefix>
        <LoongArkInputControl
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e: { target: { value: string } }) =>
            setAmount(e.target.value)
          }
        />
        <LoongArkInputSuffix>CNY</LoongArkInputSuffix>
      </LoongArkInputRoot>

      <h3>Floating Label（Material 风格）</h3>
      <FloatingLabelInput />

      <h3>PIN Input（验证码输入）</h3>
      <PinInputExample />
    </div>
  );
}

function PinInputExample() {
  const [value, setValue] = useState<string[]>([]);
  const [code4, setCode4] = useState<string[]>([]);
  const [code8, setCode8] = useState<string[]>([]);
  const [codeUpper, setCodeUpper] = useState<string[]>([]);

  return (
    <>
      <LoongArkPinInput.Root
        value={value}
        onValueChange={(details) => setValue(details.value)}
        onValueComplete={(details) => alert(`验证码：${details.valueAsString}`)}
        selectOnFocus={false}
      >
        <LoongArkPinInput.Label>6 位验证码</LoongArkPinInput.Label>
        <LoongArkPinInput.Control>
          {[0, 1, 2, 3, 4, 5].map((id) => (
            <LoongArkPinInput.Input key={id} index={id} />
          ))}
        </LoongArkPinInput.Control>
        <LoongArkPinInput.HiddenInput />
      </LoongArkPinInput.Root>

      <div style={{ marginTop: "16px" }}>
        <LoongArkPinInput.Root
          value={code4}
          onValueChange={(details) => setCode4(details.value)}
          type="numeric"
          selectOnFocus={false}
        >
          <LoongArkPinInput.Label>4 位数字密码</LoongArkPinInput.Label>
          <LoongArkPinInput.Control size="sm">
            {[0, 1, 2, 3].map((id) => (
              <LoongArkPinInput.Input key={id} index={id} size="sm" />
            ))}
          </LoongArkPinInput.Control>
          <LoongArkPinInput.HiddenInput />
        </LoongArkPinInput.Root>
      </div>

      <div style={{ marginTop: "16px" }}>
        <LoongArkPinInput.Root
          value={code8}
          onValueChange={(details) => setCode8(details.value)}
          mask
          selectOnFocus={false}
        >
          <LoongArkPinInput.Label>8 位密钥（隐藏）</LoongArkPinInput.Label>
          <LoongArkPinInput.Control size="sm">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((id) => (
              <LoongArkPinInput.Input key={id} index={id} size="sm" />
            ))}
          </LoongArkPinInput.Control>
          <LoongArkPinInput.HiddenInput />
        </LoongArkPinInput.Root>
      </div>

      <div style={{ marginTop: "16px" }}>
        <LoongArkPinInput.Root
          value={codeUpper}
          onValueChange={(details) => setCodeUpper(details.value)}
          type="alphabetic"
          autoCapitalize
          selectOnFocus={false}
        >
          <LoongArkPinInput.Label>
            4 位字母验证码（自动大写）
          </LoongArkPinInput.Label>
          <LoongArkPinInput.Control>
            {[0, 1, 2, 3].map((id) => (
              <LoongArkPinInput.Input key={id} index={id} autoCapitalize />
            ))}
          </LoongArkPinInput.Control>
          <LoongArkPinInput.HiddenInput />
        </LoongArkPinInput.Root>
      </div>
    </>
  );
}

function FloatingLabelInput() {
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <LoongArkInputRoot variant="floating" hasValue={!!value}>
        <LoongArkInputLabel>邮箱地址</LoongArkInputLabel>
        <LoongArkInputControl
          value={value}
          onChange={(e: { target: { value: string } }) =>
            setValue(e.target.value)
          }
        />
      </LoongArkInputRoot>

      <div style={{ marginTop: "16px" }}>
        <LoongArkInputRoot
          variant="floating"
          hasValue={!!password}
          state="invalid"
        >
          <LoongArkInputLabel>密码</LoongArkInputLabel>
          <LoongArkInputControl
            type="password"
            value={password}
            onChange={(e: { target: { value: string } }) =>
              setPassword(e.target.value)
            }
          />
          <LoongArkInputHelperText variant="error">
            密码至少需要 8 个字符
          </LoongArkInputHelperText>
        </LoongArkInputRoot>
      </div>
    </>
  );
}
