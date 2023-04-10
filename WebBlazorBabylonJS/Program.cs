using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using BlazorApp.Client;
using Babylon.Blazor;
using Microsoft.JSInterop;
using Data;

internal class Program
{
    private static async Task Main(string[] args)
    {
        var builder = WebAssemblyHostBuilder.CreateDefault(args);
        builder.RootComponents.Add<App>("#app");
        builder.RootComponents.Add<HeadOutlet>("head::after");

        builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.Configuration["API_Prefix"] ?? builder.HostEnvironment.BaseAddress) });

        builder.Services.AddTransient(sp => new InstanceCreator(sp.GetService<IJSRuntime>()));


        builder.Services.AddSingleton<STLStoreService>();
        builder.Services.AddSingleton<WeatherForecastService>();

      

        await builder.Build().RunAsync();

    
    }
}