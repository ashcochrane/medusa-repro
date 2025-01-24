
import { Button, Drawer, Input, Label, Select, Text } from "@medusajs/ui";
import { useState } from "react";
import { UpdateCompanyDTO } from "src/modules/company/dtos";
import { useRegions } from "../../hooks";

// TODO: add in form validation

export function CompanyForm({
  company,
  handleSubmit,
  loading,
  error,
}: {
  company?: Partial<UpdateCompanyDTO>;
  handleSubmit: (data: Partial<UpdateCompanyDTO>) => Promise<void>;
  loading: boolean;
  error: Error | null;
}) {
  const [formData, setFormData] = useState<Partial<UpdateCompanyDTO>>(
    company || ({} as Partial<UpdateCompanyDTO>)
  );

  const {
    data: { regions },
    loading: regionsLoading,
  } = useRegions();

  const currencyCodes = regions?.map((region) => region.currency_code);
  const countries = regions?.flatMap((region) => region.countries);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCurrencyChange = (value: string) => {
    setFormData({ ...formData, currency_code: value });
  };

  const handleCountryChange = (value: string) => {
    setFormData({ ...formData, country: value });
  };

  return (
    <form>
      <Drawer.Body className="p-4">
        <div className="flex flex-col gap-2">
          <Label size="xsmall">Company Name</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Beautycraft"
          />
          <Label size="xsmall">Company Phone</Label>
          <Input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0212999292"
          />
          <Label size="xsmall">Company Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="support@engage.com"
          />
          <Label size="xsmall">Company Address</Label>
          <Input
            type="text"
            name="address_1"
            value={formData.address_1 || ""}
            onChange={handleChange}
            placeholder="1234 Main St"
          />
          <Label size="xsmall">Unit</Label>
          <Input
            type="text"
            name="address_2"
            value={formData.address_2 || ""}
            onChange={handleChange}
            placeholder="Unit 4"
          />
          <Label size="xsmall">Company City</Label>
          <Input
            type="text"
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
            placeholder="Auckland"
          />
          <Label size="xsmall">Company State</Label>
          <Input
            type="text"
            name="province"
            value={formData.province || ""}
            onChange={handleChange}
            placeholder="Auckland"
          />
          <Label size="xsmall">Company Zip</Label>
          <Input
            type="text"
            name="postal_code"
            value={formData.postal_code || ""}
            onChange={handleChange}
            placeholder="1050"
          />
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-2 w-1/2">
              <Label size="xsmall">Company Country</Label>
              <Select
                name="country"
                value={formData.country || ""}
                onValueChange={handleCountryChange}
                disabled={regionsLoading}
              >
                <Select.Trigger disabled={regionsLoading}>
                  <Select.Value placeholder="Select a country" />
                </Select.Trigger>
                <Select.Content className="z-50">
                  {countries?.map((country) => (
                    <Select.Item key={country.iso_2} value={country.iso_2}>
                      {country.name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <Label size="xsmall">Currency</Label>

              <Select
                name="currency_code"
                value={formData.currency_code || ""}
                onValueChange={handleCurrencyChange}
                defaultValue={currencyCodes?.[0]}
                disabled={regionsLoading}
              >
                <Select.Trigger disabled={regionsLoading}>
                  <Select.Value placeholder="Select a currency" />
                </Select.Trigger>

                <Select.Content className="z-50">
                  {currencyCodes?.map((currencyCode) => (
                    <Select.Item key={currencyCode} value={currencyCode}>
                      {currencyCode.toUpperCase()}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </div>
          </div>
        </div>
      </Drawer.Body>
      <Drawer.Footer>
        <Drawer.Close asChild>
          <Button variant="secondary">Cancel</Button>
        </Drawer.Close>
        <Button
          isLoading={loading}
          onClick={async () => await handleSubmit(formData)}
        >
          Save
        </Button>
        {error && (
          <Text className="txt-compact-small text-ui-fg-warning">
            Error: {error?.message}
          </Text>
        )}
      </Drawer.Footer>
    </form>
  );
}
